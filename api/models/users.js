
const mongoose = require("mongoose"); 


//what should the user need to have? 
const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true, 
        unique: true, 
        trim: true,
        min: 6,
        max: 255
    }, 
    email: {
        type: String, 
        required: true, 
        unique: true, 
        trim: true, 
        lowercase: true, 
        min: 6, 
        max: 255
    }, 
    password: {
        type: String,
        required: true,
        trim: true,  
        max: 1024, 
        min: 6, 
    }, 
    date: {
        type: Date, 
        default: Date.now, 
    }
})

module.exports = mongoose.model("User", userSchema); 