const express=require('express')
const bodyparser=require('body-parser')
const fs=require('fs')
const path=require('path')
const morgan = require("morgan");
const cors=require('cors')
const app=express()
const dotenv = require("dotenv");
dotenv.config();
const sequelize=require('./util/database')
const userRouter=require('./router/userRouter')
const expenseRouter=require('./router/expenseRouter')
const purchaseMembershipRouter = require("./router/purchaseMembershipRouter");
const leaderboardRouter = require("./router/leaderboardRouter");
const resetPasswordRouter = require("./router/resetPasswordRouter");
const reportsRouter = require("./router/reportsRouter");
const User=require('./model/userModel')
const Expense=require('./model/expenseModel')
const Order = require("./model/ordersModel");
const ResetPassword = require("./model/resetPasswordModel");
app.use(express.static('public'))

app.use(cors())
app.use(bodyparser.json())

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  {flags:'a'}
);
app.use(morgan("combined", { stream: accessLogStream }));



app.use("/", userRouter);
app.use("/user", userRouter);

app.use("/homePage", expenseRouter);
app.use("/expense", expenseRouter);

app.use("/purchase", purchaseMembershipRouter);

app.use("/premium", leaderboardRouter);

app.use("/password", resetPasswordRouter);

app.use("/reports", reportsRouter);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

ResetPassword.belongsTo(User);
User.hasMany(ResetPassword);

sequelize.sync()
    .then(res=>{
      app.listen(process.env.PORT)
    })
    .catch(err=>{
        console.log(err)
    })





