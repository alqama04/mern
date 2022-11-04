const express = require('express')
const dotenv = require('dotenv')
dotenv.config({path:"config/.env"})
const app = express()
const PORT = process.env.PORT || 3500
const path = require('path')
// const {logger} =require('./logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const userRoute  = require('./routes/userRoute')
const dbConnect = require('./config/connectDb')
const mongoose = require('mongoose')
const createError = require('http-errors');




dbConnect() 
// app.use(logger)
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use('/users',userRoute)



app.use(async(req,res,next)=>{
    next(createError.NotFound("this route does not exist"))
})




mongoose.connection.once('open',()=>{
    app.listen(PORT,()=>{
        console.log("server running",PORT)
    })
})

app.use(errorHandler)
mongoose.connection.on('error',err=>{
    console.log(err.code,err.hostname,err.syscall )
})