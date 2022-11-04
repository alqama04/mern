const cathAsyncErr = require('../middleware/cathAsyncErr')
const User = require('../models/User')
const Note = require('../models/notes')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')



const getAllUsers =asyncHandler(async(req,res,next)=>{
    const users = await User.find().select('-password').lean()
    if(!users?.length){
        return res.status(400).json({message:"no users found"})
    }
    res.json(users)

})

// create Users
const createNewUsers =asyncHandler(async(req,res)=>{
    const {username,password,roles} = req.body
    if(!username || !password ||!Array.isArray(roles) ||!roles.length){
        return res.status(400).json({message:"All fields are required"})
    }
    // check for duplicate
    const duplicate = await User.findOne({username}).lean().exec()
    // if(duplicate){
    //     return res.status(409).json({message:"duplicate Value"})
    // }
    // hasp password
    const hashedPwd = await bcrypt.hash(password,10)

    const userObject = {username,"password":hashedPwd,roles}

    const user = await User.create(userObject)

    if(user){
        return res.status(201).json({message:user})
    }
    else{
        return res.status(400).json({message:"Invalid Data Recieved"})
    }
})

// update Users
// @access private
const updateUsers =asyncHandler(async(req,res)=>{
    const {id,username,roles,active,password} = req.body
    if (!id || !username|| !roles||!Array.isArray(roles)||!roles.length|| typeof active !== 'boolean'){
        return res.status(400).json({message:"All fields are required"})
    }
    const user = await User.findById(id).exec()
    if(!user){
        return res.status(400).json({message:"User not found"})
    }
    const duplicate = await User.findOne({username}).lean().exec()
    //  allowe updates to the orignal user
    if(duplicate && duplicate?._id.toString()!==id){
        return res.status(409).json({message:"duplicate Value"})
    }
    user.username = username
    user.roles = roles
    user.active = active

    if(password){
        user.password = await bcrypt.hash(password,10)
    }
    const updateUser = await user.save()
    res.json({message:`${updateUser.username}update successufully`})

})
// delete Users
// @access private
const deleteUsers =asyncHandler(async(req,res)=>{
    if(!req.body.id){
        return res.status(400).json({message:"User Id required"})
    }
    const notes = await Note.findOne({user:id}).lean().exec()
    if(notes?.length){
        return res.status(400).json({message:"user assigned Note"})
    }
    const user = await User.findById(req.body.id)
    if(!user){
        return res.status(400).json({message:"user Not found"})
    }
    const result = await user.deleteOne()
    const reply = `${result.username} deleted successuflly`
    res.json(reply)
})


module.exports = {
    getAllUsers,
    createNewUsers,
    updateUsers,
    deleteUsers
}
exports.login = cathAsyncErr(async(req,resp,nect)=>{
    resp.send('working')
})