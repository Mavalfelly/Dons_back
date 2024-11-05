const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    price:{
        type: String,
        required: true,
    },
    ingredients:{
        type: String,
        required: true,
    },
    foodImg:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    }
})

const Menu = mongoose.model('Menu', menuSchema)
module.exports = Menu