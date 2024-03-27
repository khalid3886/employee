const express=require('express')
const {connection} = require('./db')
const app=express()
const {userRouter}=require('./route/user.route')
const {empRouter}=require('./route/employee.route')
const cors=require('cors')

app.use(express.json())
app.use(cors())
app.use('/users',userRouter)
app.use('/employee',empRouter)
app.get('/',(req,res)=>{
    res.send('home page')
})

app.listen(8080,async(req,res)=>{
    console.log('connected to server')
    try{
        await connection
        console.log('connected to db')
    }
    catch(err)
    {
        console.log(err)
    }
})