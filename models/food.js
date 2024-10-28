const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
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

const Foods = mongoose.model('Food', foodSchema)
module.exports = Foods