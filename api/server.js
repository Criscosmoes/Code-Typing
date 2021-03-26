const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv");

dotenv.config();

const server = express();

//import user routes
const UserRouter = require("./routes/user");

// passport
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback", // this links up with server.get("/auth/google/callback")
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(`accessToken: ${accessToken}, refreshToken: ${refreshToken}, profile: ${JSON.stringify(profile.displayName)}`);
    }
  )
);

server.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

server.get("/auth/google/callback", passport.authenticate("google")) // this now uses the google strategy call back URL up above
 
server.use(cors());
server.use(helmet());
server.use(express.json());

server.use("/api", UserRouter);

module.exports = server;
