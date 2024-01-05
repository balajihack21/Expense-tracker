const express = require("express");
const path=require('path')
const router = express.Router();
const expenseController = require("../controller/expenseController");
const userAuthentication = require("../middleware/auth");

router.use(express.static('public'))
router.get("/", (req,res)=>{
    res.sendFile(
        path.join(__dirname, "../", "public", "views", "homepage.html")
      );
});
router.get(
  "/getAllExpenses",
  userAuthentication,
  expenseController.getAllExpenses
);
router.get(
  "/getAllExpenses/:page",
  userAuthentication,
  expenseController.getAllExpensesforPagination
);
router.get(
  "/deleteExpense/:id",
  userAuthentication,
  expenseController.deleteExpense
);

router.post("/addExpense", userAuthentication, expenseController.addExpense);
router.post(
  "/editExpense/:id",
  userAuthentication,
  expenseController.editExpense
);

module.exports = router;
