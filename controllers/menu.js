const express = require('express');
const verify = require('../middleware/verify')
const Menu = require('../models/menu');
const multer = require('multer');
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
        const menuList = await Menu.find({})
        res.status(200).json(menuList)
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

router.get('/:menuId', async (req,res) => {
    try {
        const item = await Menu.findById(req.params.itemId)
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json(error);   
    }
});

router.put('/:menuId', async (req,res) => {
    try {
        const {name, price, ingredients, foodImg, description} = req.body
        const updatedItem = await Menu.findByIdAndUpdate(req.params.itemId, {name, price, ingredients, foodImg, description}, {new: true})
        res.status(200).json(updatedItem)
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete('/:menuId', async (req,res) => {
    try {
        const removedItem = await Menu.findByIdAndDelete(req.params.itemId)
        res.status(200).json(removedItem)
    } catch (error) {
        res.status(500).json(error);
    }
});

const storage = multer.memoryStorage(); // or specify disk storage options
const upload = multer({ storage });


router.post('/', upload.single('foodImg'), async (req, res) => {
    try {
        const { name, price, ingredients, description } = req.body;
        const foodImg = req.file; // This will contain the uploaded file data

        // Process the image file as needed (e.g., upload to cloud storage) and save the URL/path
        // Here we assume `foodImg` is directly stored; adjust as necessary for your storage solution

        const newItem = await Menu.create({
            name,
            price,
            ingredients,
            foodImg: req.file ? req.file.path : "", // Use appropriate file handling
            description
        });

        res.status(201).json(newItem);
    } catch (error) {
        console.error("Error creating menu item:", error);
        res.status(500).json({ message: "Error creating menu item", error });
    }
});

module.exports = router;
