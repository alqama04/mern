const {format} = require('date-fns')
const {v4:uuid}= require('uuid')
const fs = require('fs')
const fsPromise = require('fs').promises
const path = require('path')

exports.logEvents = async(message,logFileName)=>{
    const dateTime = format(new Date(),'yyyyMMdd\tHH:mm:ss')
    const logItem = `${dateTime}\t${uuid()}\ts${message}\n`

    try {
        if(!fs.existsSync(path.join(__dirname,'...','logs'))){
            await fsPromise.mkdir(path.join(__dirname,'...','logs'))
        }
        await fsPromise.appendFile(path.join(__dirname,'...','logs',logFileName),logItem)
    } catch (error) {
        console.log(error)
    }
}

exports.logger =(req,res,next)=>{
    logEvents(`${req.method}\t${req.url}\t${req.header.origin}`)

    console.log(`${req.method}\ ${req.path}`)
    next()
}

// module.exports(logEvents,logger)
