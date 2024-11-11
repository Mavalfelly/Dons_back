const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    dishType:{
        type: String,
        enum: [
            "APPETIZER", "DESSERT", "DRINK", "COCKTAIL", "SAKE", 
            "IMPORTED BEER", "HOUSE WINE", "DOMESTIC BEER", "SPARKLING WINE", 
            "WHITE WINE", "RED WINE", "FRIED RICE", "VIETNAMESE RICE PLATTERS", 
            "ENTREES", "NOODLES", "BANH MI", "V-BOWLS VERMICELLI", 
            "PHO NOODLE SOUPS", "SOUPS & SALADS", "CATERING"
        ],
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    ingredients:{
        type: [String],
        required: true,
    },
    foodImg:{
        type: String,
    },
    description:{
        type: String,
        required: true,
    }
})

const Menu = mongoose.model('Menu', menuSchema)
module.exports = Menu