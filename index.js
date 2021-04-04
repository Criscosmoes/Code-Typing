const dotenv = require("dotenv"); 
const server = require("./api/server");
const mongoose = require("mongoose"); 
const express = require("express"); 




dotenv.config(); 


//Connect to DB

mongoose.connect(process.env.MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false}, () => console.log("Connected to DB")); 




if (process.env.NODE_ENV === "production"){
    server.use(express.static("client/build")); 



    const path = reqiure("path"); 
    server.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html")); 
    })
}



const PORT = process.env.PORT || 4000; 


server.listen(PORT, () => console.log(`Listening on port ${PORT}`))