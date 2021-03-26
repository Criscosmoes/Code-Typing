const express = require("express"); 
const helmet = require("helmet"); 
const cors = require("cors"); 


const server = express(); 


//import user routes
const UserRouter = require("./routes/user"); 



server.use(cors()); 
server.use(helmet()); 
server.use(express.json()); 


server.use("/api", UserRouter); 

module.exports = server; 