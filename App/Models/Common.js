const Student = require('./Student')
const Tutor = require('./Tutor')
let CommonService = {}

CommonService.getUser = async(userId, userType)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            let result = await executePromisified(`select * from Users where id = ${userId}`)
            let [{id, name, type}] = result
            if(userType != type) return reject("Invalid User Id.")
            if(type == 'teacher') return resolve(new Tutor(id, name, userId))
            else return resolve(new Student(id, name, userId))
        }catch(e){
            return reject(e)
        }
    }) 
}

CommonService.viewFiles = async(classCode, filter = undefined)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            let query = `select name, description, file, fileType from files
                        where classCode = ${classCode} `
            if(filter){
                if(filter.name) query += `and name = ${filter.name} `
                if(filter.type) query += `and fileType = ${filter.type}`
            }
            let files = await executePromisified(query)
            return resolve(files)
        }catch(e){
            console.log(e)
            reject()
        }
    })
}

module.exports = CommonService;