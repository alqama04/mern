const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'pleae eneter your name'],
        unique: true
    }
    ,
    password: {
        type: String,
        required: [true, "password fields can't be blank"]
    },
    roles: [{
        type: String,
        default: "employee"
    }],
    active: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('User', userSchema)