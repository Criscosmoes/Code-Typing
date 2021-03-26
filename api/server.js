const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const server = express();

//import user routes
const UserRouter = require("./routes/user");

const PassportRouter = require("./routes/passport"); 


 
server.use(cors());
server.use(helmet());
server.use(express.json());

server.use("/api", UserRouter);
server.use(PassportRouter); 

module.exports = server;
