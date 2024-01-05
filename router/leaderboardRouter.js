const express = require("express");
const path=require("path")
const router = express.Router();
const leaderboardController = require("../controller/leaderboardController");

router.get("/getLeaderboardPage", (req,res)=>{
    res.sendFile(
        path.join(__dirname, "../", "public","views", "leaderboard.html")
      );
});

// router.get("/getLeaderboard", leaderboardController.getLeaderboard);

module.exports = router;
