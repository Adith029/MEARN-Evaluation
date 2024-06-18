const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')
const userDb = require('../models/userModel')
const { authentication } = require('../middlewares/userAuthentication')
require('dotenv').config()

const createUser = async(req,res)=>{
    try {
        const data = req.body
        const plainPassword = data.password
        const hashedPassword = await bcrypt.hash(plainPassword,10)
        data.password=hashedPassword

        const userData = await userDb.create(data)

        userData.password==null

        const token = await jwt.sign({sub:userData},process.env.JWT_TOKEN,{expiresIn:"3d"})
        return res.status(200).send({user:userData,token:token})
    } catch (error) {
        return res.status(500).send(error)
    }
}

const viewAllUser = async(req,res)=>{
    try {
        const user = await userDb.find()
        return res.status(200).send(user)
    } catch (error) {
        return res.status(500).send(error)
    }
}

const loginUser = async(req,res)=>{
   try {
    const {email,password} = req.query
    const user = await userDb.findOne({email:email})
    if(user==null){
        return res.status(401).send("user not found")
    }
    const hash = user.password
    if(hash==null){
        return res.status(401).send("Password not set")
    }

    const checkPassword = await bcrypt.compare(password,hash)
    return res.status(200).send({status:true,message:"user logged in"})
   } catch (error) {
    return res.status(500).send(error)
   }
}

const viewUser = async(req,res)=>{
    try {
     const {email,password} = req.query
     const user = await userDb.findOne({email:email})
     if(user==null){
         return res.status(401).send("user not found")
     }
     const hash = user.password
     if(hash==null){
         return res.status(401).send("Password not set")
     }
 
     const checkPassword = await bcrypt.compare(password,hash)
     return res.status(200).send({user:user})
    } catch (error) {
     return res.status(500).send(error)
    }
 }

    const updateUser = async (req,res)=>{
        try {
            const {id} = req.params
            const updatedData = req.body
            await userDb.findByIdAndUpdate(id,updatedData) 
            return res.status(200).send("OK")
        } catch (error) {
            return res.status(500).send(error)
        }
    }

    const userAuthentication = async (req,res)=>{
        try {
            return res.status(200).send("OK") 
        } catch (error) {
            return res.status(500).send(error)  
        }
    }
    



module.exports={createUser,loginUser,viewUser,updateUser,userAuthentication,viewAllUser}