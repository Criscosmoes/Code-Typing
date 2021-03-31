const mongoose = require("mongoose"); 


const scoresSchema = new mongoose.Schema({
    wordsPerMinute: {
        type: Number, 
        required: true, 
        min: 0,
        max: 400
    }, 
    id: {
        type: String, 
        required: true, 
    }, 
    name: {
        type: String, 
        required: true
    }, 
    date: {
        type: Date, 
        default: Date.now, 
    }
})

module.exports = mongoose.model("Scores", scoresSchema); 
