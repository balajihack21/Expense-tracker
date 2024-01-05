const express = require("express");
const path=require('path')
const router = express.Router();
const reportsController = require("../controller/reportsController");
const userAuthentication = require("../middleware/auth");

router.get("/getReportsPage", (req,res)=>{
  res.sendFile(path.join(__dirname, "../", "public", "views", "reports.html"))
});
router.post(
  "/dailyReports",
  userAuthentication,
  reportsController.dailyReports
);
router.post(
  "/monthlyReports",
  userAuthentication,
  reportsController.monthlyReports
);

module.exports = router;
