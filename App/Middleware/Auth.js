var jwt = require('jsonwebtoken')
const CommonService = require('../Models/Common')

let AuthController = {}

AuthController.generateJWT = async(req, res)=>{

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
        if(req.params.userId[0] != type) {
            res.send("Invalid UserId.")
        }
        req.user = await CommonService.getUser(req.params.userId, type)
        next()
    }catch(e){
        console.log(e)
        res.send("Invalid UserId.")
    }
}

export default AuthController