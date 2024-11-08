const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    dishType:{
        type: String,
        enum: [
            "Main", "Appetizer", "Dessert", "Side", "Drink", "Cocktail", "Sake", 
            "IMPORTED BEER", "House Wine", "DOMESTIC BEER", "SPARKLING WINE", 
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
        required: false,
    },
    description:{
        type: String,
        required: true,
    }
})

const Menu = mongoose.model('Menu', menuSchema)
module.exports = Menu