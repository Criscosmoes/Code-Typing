const dotenv = require("dotenv"); 

const mongoose = require("mongoose"); 
const express = require("express"); 

const server = require("./api/server");





dotenv.config(); 


if (process.env.NODE_ENV === "production"){

    console.log("this is a test"); 
    const path = require("path"); 

    server.use('/static', express.static(path.join(__dirname, 'client/build')));

    server.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html")); 
        console.log("this worked"); 
    })
}


//Connect to DB

mongoose.connect(process.env.MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false}, () => console.log("Connected to DB")); 




const PORT = process.env.PORT || 4000; 


server.listen(PORT, () => console.log(`Listening on port ${PORT}`))