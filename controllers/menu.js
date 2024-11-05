const express = require('express');
const verify = require('../middleware/verify')
const Menu = require('../models/menu');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
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

const uploadDir = path.join(__dirname, '..', 'uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Save files to the uploads directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});

// Initialize multer with the defined storage
const upload = multer({ storage: storage });

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
        const item = await Menu.findById(req.params.menuId)
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json(error);   
    }
});

router.put('/:menuId', upload.single('foodImg'), async (req, res) => {
    try {
        const { name, price, ingredients, description } = req.body;

        let foodImgUrl = req.file ? `/uploads/${req.file.filename}` : undefined; // Only update if file exists

        const updateData = {
            name,
            price,
            ingredients,
            description,
        };
        if (foodImgUrl) updateData.foodImg = foodImgUrl; // Update foodImg only if there's a new file

        const updatedItem = await Menu.findByIdAndUpdate(req.params.menuId, updateData, { new: true });
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json(error);
    }
});


router.delete('/:menuId', async (req,res) => {
    try {
        const removedItem = await Menu.findByIdAndDelete(req.params.menuId)
        res.status(200).json(removedItem)
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/', upload.single('foodImg'), async (req, res) => {
    try {
        const { name, price, ingredients, description } = req.body;
        
        let foodImgUrl = req.file ? `/uploads/${req.file.filename}` : ""

        const newItem = await Menu.create({
            name: name,                
            price: price,              
            ingredients: ingredients,   
            foodImg: foodImgUrl,        
            description: description    
        });

        res.status(201).json(newItem);
    } catch (error) {
        console.error("Error creating menu item:", error);
        res.status(500).json({ message: "Error creating menu item", error });
    }
});

module.exports = router;

