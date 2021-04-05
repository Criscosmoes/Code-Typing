const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");


const cookieSession = require("cookie-session"); 
const passport = require("passport"); 



dotenv.config();

const server = express();

 



//import user routes
const UserRouter = require("./routes/user");
const PassportRouter = require("./routes/passport"); 
const TextsRouter = require("./routes/texts"); 
const ScoresRouter = require("./routes/scores"); 


//middleware
server.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days before it expires
        keys: [process.env.COOKIE_KEY]
    })
)

server.use(passport.initialize()); 
server.use(passport.session());
server.use(cors());
server.use(helmet());
server.use(express.json());

server.use("/api", ScoresRouter); 
server.use("/api", TextsRouter); 
server.use("/api", UserRouter);

server.use(PassportRouter);


if (process.env.NODE_ENV === "production"){

    console.log("this is a test"); 
    const path = require("path"); 

    server.use('/static', express.static(path.join(__dirname, '../client/build')));

    server.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client", "build", "index.html")); 
        console.log("this worked"); 
    })
}






module.exports = server;
