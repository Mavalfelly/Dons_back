const express = require('express');
const verify = require('../middleware/verify')
const Foods = require('../models/food');
const router = express.Router();


//unsigned routing
router.get('/', async (req,res) => {
    try {
        const foodList = await Foods.find({})
        res.status(200).json(foodList)
    } catch (error) {
        res.status(500).json(error)
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
    
})

module.exports = router