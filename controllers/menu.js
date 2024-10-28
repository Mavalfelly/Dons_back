const express = require('express');
const verify = require('../middleware/verify')
const Foods = require('../models/food');
const router = express.Router();
// const admin = require('../middleware/isAdmin')
const Sug = require('../models/sugs');


function isAdmin(req, res, next) {
    console.log(req.user)
    if (req.user && req.user.admin === true) { 
        next();
    } else {
        res.status(403).json({ error: 'Forbidden: Requires admin access' });
    }
};

//unsigned routing
router.get('/', async (req,res) => {
    try {
        const foodList = await Foods.find({})
        res.status(200).json(foodList)
    } catch (error) {
        res.status(500).json(error)
    }
});


router.use(verify)

router.post('/suggestions', async (req,res) => {
    try {
        const {sugName, sugIngredients, sugDetails, subBy } = req.body
        const suggestedItem = await Sug.create({sugName, sugIngredients, sugDetails, subBy })
        res.status(201).json(suggestedItem)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/suggestions', async (req,res) =>{
    try {
        const recomendations = await Sug.find({});
        res.status(200).json(recomendations);
        
    } catch (error) {
        res.status(500).json(error)
    }
})


router.use(isAdmin)

router.get('/:itemId', async (req,res) => {
    try {
        const item = await Foods.findById(req.params.itemId)
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json(error);   
    }
});

router.put('/:itemId', async (req,res) => {
    try {
        const {name, price, ingredients, foodImg, description} = req.body
        const updatedItem = await Foods.findByIdAndUpdate(req.params.itemId, {name, price, ingredients, foodImg, description}, {new: true})
        res.status(200).json(updatedItem)
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete('/:itemId', async (req,res) => {
    try {
        const removedItem = await Foods.findByIdAndDelete(req.params.itemId)
        res.status(200).json(removedItem)
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/', async (req,res) => {
    try {
        const {name, price, ingredients, foodImg, description} = req.body
        const newItem = await Foods.create({name, price, ingredients, foodImg, description});
        res.status(201).json(newItem)
    } catch (error) {
        res.status(500).json(error)
    }
    
});
module.exports = router