const fs = require('fs')
let CommonService = require('./Common')
require('dotenv').config()

class Tutor{
    constructor(id, name){
        this.id = id
        this.name = name
    }

    addClass = async(name, description, classCode)=>{
        try{
            // If class info (classCode) was already in DB, It's updated, else new entry is created.
            await executePromisified(`insert into classes (name, description, classCode, createdBy) values("${name}", "${description}", "${classCode}", ${this.id})
                                        on duplicate key update active = 1, description = "${description}", name = "${name}", createdBy = ${this.id}`)
            return "Successfully Added."
        }catch(e){
            console.log(e)
        }
    }

    updateClass = async(update)=>{
        try{
            let set = `set `
            if(update.name) set += `name = ${update.name} `
            if(update.description) set += `description = ${update.description} `
            if(update.classCode) set += `classCode = ${update.classCode} `
            await executePromisified(`update classes ${set} where classCode = "${classCode}"`)
            return "Successfully Updated."
        }catch(e){
            console.log(e)
            return "Error"
        }
    }

    removeClass = async(classCode)=>{
        try{
            let result = await executePromisified(`update classes set active = 0 where classCode = "${classCode} and createdBy = ${this.id}"`)
            // Class is removed, Students enrolled with the class need to be removed. 
            // removing student from class as well
            if(result.changedRows){
                await executePromisified(`update student_classes set active = 0 where classCode = "${classCode}"`)
                return "Class Removed"
            }
            return "Class Not Found"
        }catch(e){
            console.log(e)
            return "Error"
        }
    }
    
    addStudents = async(students, classCode)=>{
        try{
            let res = {}
            for(let student of students){
                try{
                    // await executePromisified(`insert into student_classes (studentId, classCode) values(${student.id}, "${classCode}")
                    //                                 on duplicate key update active = 1`)
                    let result = await executePromisified(`replace into student_classes (studentId, classCode)
                                            select ${student}, "${classCode}" where exists (select classCode from classes where createdBy = ${this.id} and classCode = "${classCode}")`)
                    if(result.affectedRows) res[student] = `Enrolled in ${classCode}`
                    else res[student] = `Validation Error`
                }catch(e){
                    console.log(e)
                    res[student] = "Wrong student Id or Wrong classCode"
                }  
            }
            return res
        }catch(e){
            console.log(e)
            return "Wrong student Id or Wrong classCode"
        }
    }

    removeStudent = async(student, classCode)=>{
        try{
            let result = await executePromisified(`select active from classes where classCode = '${classCode}' and createdBy = ${this.id}`)
            if(result[0] && result[0].active){
                await executePromisified(`update student_classes set active = 0 where classCode = "${classCode}" and studentId = ${student}`)
                return "Successfully removed"
            }else "Class Tutor can only remove Students."
        }catch(e){
            console.log(e)
            return "Please provide right student ID and classCode."
        }
    }

    addFile = async(name, description, classCode, fileType, file = null)=>{
        try{
            let result = await executePromisified(`select active from classes where classCode = '${classCode}' and createdBy = ${this.id}`)
            if(result[0] && result[0].active){
                try{
                    if(file && fileType != 4) result = await CommonService.uploadToS3(name, classCode, file)
                    if(result == true) {
                        console.log(result)
                        fs.unlink(`${file.path}`, (err) => {console.log(err)});
                        file = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${classCode+name}`
                    }
                    await executePromisified(`insert into files (name, description, classCode, file, fileType, uploadedBy) values("${name}", "${description}", "${classCode}", "${file}", ${fileType}, ${this.id})`)
                    return "Successfully Added"
                }catch(e){
                    console.log(e)
                    return "Cannot be uploaded. Check s3 settings."
                }
                
            }else return "Class Tutor Can Only Add."
        }catch(e){
            console.log(e)
            return "Invalid data."
        }

    }

    viewClasses = async()=>{
        try{
            let classes = await executePromisified(`select name, classCode from classes where createdBy = ${this.id} and active = 1`)
            return classes
        }catch(e){
            console.log(e)
            return "Error"
        }
    }

    viewFiles = async(classCode, filter)=>{
        try{
            let files = await CommonService.viewFiles(classCode, filter, this.id)
            return files
        }catch(e){
            console.log(e)
            return "Error"
        }
    }

}

module.exports = Tutor;