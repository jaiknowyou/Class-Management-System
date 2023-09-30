var jwt = require('jsonwebtoken')
const CommonService = require('../Models/Common')

let AuthController = {}

AuthController.generateJWT = async(req, res)=>{
    try{

    }catch(e){
        console.log(e)
    }
}

AuthController.verify = async(req, res, next)=>{
    try{
        next()
    }catch(e){
        console.log(e)
    }
}

AuthController.user = (type)=> async(req, res, next)=>{
    try{
        req.user = await CommonService.getUser(parseInt(req.params.userId), type)
        next()
    }catch(e){
        console.log(e)
        res.send("Invalid UserId.")
    }
}

module.exports = AuthController