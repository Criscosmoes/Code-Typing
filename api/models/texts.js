const mongoose = require("mongoose"); 

const textSchema = new mongoose.Schema({

    language: {
        type: String, 
        required: true, 
        min: 1, 
        max: 400
    }, 

    text: {
        type: String, 
        required: true, 
        unique: true, 
        trim: true, 
        lowercase: true, 
        min: 5, 
        max: 255, 
    }
})

module.exports = mongoose.model("Text", textSchema); 