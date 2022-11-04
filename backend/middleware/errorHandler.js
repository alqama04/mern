const createError = require('http-errors');

const errorHandler= (err,req,res,next)=>{

    if(err.code ===11000){
       err = createError.BadRequest("this username is taken")
    }
    res.json({status:err.status,message:err.message})
}

module.exports = errorHandler