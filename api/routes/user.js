const router = require("express").Router(); 
const User = require("../models/users"); 


router.get("/users", async (req, res) => {

    try {

        const users = await User.find({}); 

        res.status(200).send(users); 

    }
    catch(e){
        res.status(500).send(e.message); 
    }


})

module.exports = router; 