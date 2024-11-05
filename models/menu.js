const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    dishType:{
        type: String,
        enum: ['Main', 'Appetizer', 'Dessert', 'Side', 'Drink'],
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