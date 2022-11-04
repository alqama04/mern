const mongoose = require('mongoose')

const dbConnect =async ()=>{
    try{
        const DB_OPTIONS ={
            dbName:"DaveGray"
        }
        await mongoose.connect(process.env.DB_URL,DB_OPTIONS,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log('Connected')
    }catch{
        console.log('Something Went Wrong')
    }
}

module.exports = dbConnect