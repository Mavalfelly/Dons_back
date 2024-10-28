const mongoose = require('mongoose');

const sugsSchema = new mongoose.Schema({
    sugName: {
        type: String,
        required: true
    },
    sugIngredients: {
        type: String,
        required: true
    },
    sugDetails: {
        type: String,
        required: true
    },
    subBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Suggestions = mongoose.model('Suggestions',sugsSchema)

module.exports = Suggestions