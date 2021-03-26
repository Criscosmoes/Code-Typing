const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");


const cookieSession = require("cookie-session"); 
const passport = require("passport"); 



dotenv.config();

const server = express();

server.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days before it expires
        keys: [process.env.COOKIE_KEY]
    })
)

server.use(passport.initialize()); 
server.use(passport.session()); 



//import user routes
const UserRouter = require("./routes/user");
const PassportRouter = require("./routes/passport"); 


//middleware
server.use(cors());
server.use(helmet());
server.use(express.json());

server.use("/api", UserRouter);
server.use(PassportRouter); 

module.exports = server;
