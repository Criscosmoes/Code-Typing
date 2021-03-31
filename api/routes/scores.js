const router = require("express").Router(); 
const Score = require("../models/scores"); 


//middlewares
/* const { accessToDetails } = require("../middlewares/users/accessToDetails");  */

// add the current wpm to user scores
router.post("/scores", async (req, res) => {

    try {

        console.log(req.user); 

        const { score } = req.body; 

        if(!score) return res.status(400).json("Please provide a score to save"); 



        const newScore = new Score({
            wordsPerMinute: score,
            id: req.user.googleId, 
            name: req.user.username
        })

        await newScore.save(); 

        res.status(201).json("Score saved successfully"); 
        


    }catch(e){
        res.status(500).send(e.message); 
    }

})

// get scores of current user
router.get("/scores", async (req, res) => {

    try {

        const scores = await Score.find({owner: req.user.googleId})

        res.status(200).send(scores); 


    }catch(e){
        res.status(500).send(e.message); 
    }


})


// get all scores in descending order for leaderboards
router.get("/leaders", async (req, res) => {
    
    try {

        const allScores = await Score.find({}); 

        res.status(200).send(allScores); 


    }catch(e){
        res.status(500).send(e.message); 
    }


})


// delete all users scores associated with logged in account
router.delete("/scores", async (req, res) => {

    try {

        // remove all user scoers associated with account
        await Score.deleteMany({owner: req.userId})
        res.status(200).json("Scores deleted successfully"); 

    }catch(e){
        res.status(500).send(e.message); 
    }


})

module.exports = router; 