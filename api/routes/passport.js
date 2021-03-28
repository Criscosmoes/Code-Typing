const router = require("express").Router(); 
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;


//user model 
const User = require("../models/users"); 

passport.serializeUser((user, done) => {

    done(null, user.id); 

}); 

passport.deserializeUser((id, done) => {

    User.findById(id).then(user => {
      done(null, user); 
    })
})

// passport
passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/google/callback", // this links up with server.get("/auth/google/callback")
      },
       async (accessToken, refreshToken, profile, done) => {
  
        try {
            const userTaken = await User.findOne({googleId: profile.id}); 

            // if the user is new here, make a new account for them
            if(!userTaken){

              const newUser = await new User({username: profile.name.givenName, googleId: profile.id}).save(); 
              console.log("new user created"); 
              done(null, newUser)
            }
            else {
              done(null, userTaken); 
            }
  
        }
        catch(e){
            console.log(e.message); 
        }
  
      }
    )
  );
  
  router.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );
  
  router.get("/auth/google/callback", passport.authenticate("google")) // this now uses the google strategy call back URL up above


  router.get("/logout", (req, res) => {
    req.logout(); 
    res.send(req.user); 
  }); 


  router.get("/current_user", (req, res) => {
    
    res.send(req.user); 
  })


  module.exports = router; 