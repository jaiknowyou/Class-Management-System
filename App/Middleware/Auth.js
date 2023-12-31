var jwt = require('jsonwebtoken')
const CommonService = require('../Models/Common')
const Tutor = require('../Models/Tutor')
const Student = require('../Models/Student')
const { json } = require('sequelize')

let AuthController = {}

AuthController.generateJWT = async(req, res)=>{
    try{
        let commonCheck = CommonService.commonCheck(req, ["username", "password"], 'body')
        if(commonCheck) return res.send(`Missing Parameter ---> ${commonCheck}`)
        // Arbitrary username and password ---> no check
        return res.send(jwt.sign(req.body.username, PRIVATE_KEY))
    }catch(e){
        console.log(e)
    }
}

AuthController.verify = async(req, res, next)=>{
    try{
        let verify = jwt.verify(req.headers.token, PRIVATE_KEY)
        if(!verify) return res.send("Invalid or Expired Token.")
        next()
    }catch(e){
        console.log(e)
    }
}

AuthController.user = (userType)=> async(req, res, next)=>{
    try{
        let userId = parseInt(req.params.userId)
        let result = await executePromisified(`select * from Users where id = ${userId}`)
        let [{id, name, type}] = result
        if(userType != type) return res.send("Invalid User Id.")
        if(type == 'teacher') req.user = new Tutor(id, name)
        else req.user = new Student(id, name)
        next()
    }catch(e){
        console.log(e)
        return res.send("Invalid UserId.")
    }
}

module.exports = AuthController