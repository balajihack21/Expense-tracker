const express=require('express')
const bodyparser=require('body-parser')
const sequelize=require('./util/database')
const cors=require('cors')
const userRouter=require('./router/userRouter')
const app=express()

app.use(cors())
app.use(bodyparser.json())

app.use(express.static('public'))

app.use('/user',userRouter)

sequelize.sync()
    .then(res=>{
      app.listen(4000)
    })
    .catch(err=>{
        console.log(err)
    })





