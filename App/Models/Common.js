const Student = require('./Student')
const Tutor = require('./Tutor')
let CommonService = {}

CommonService.getUser = (userId, userType)=>{
    new Promise(async(resolve, reject)=>{
        let {id, name, type} = await executePromisified(`select * from users where userId = ${userId}`)[0]
        if(userType != type) reject("Invalid User Id.")
        if(userId[0] == 't') resolve(Tutor(id, name, userId))
        else resolve(Student(id, name, userId))
    }) 
}

CommonService.viewFiles = async(classCode, filter = undefined)=>{
    try{
        let query = `select name, description, file, fileType from files
                    where classCode = ${classCode} `
        if(filter){
            if(filter.name) query += `and name = ${filter.name} `
            if(filter.type) query += `and fileType = ${filter.type}`
        }
        let files = await executePromisified(query)
        return files
    }catch(e){
        console.log(e)
    }
}

export default CommonService;