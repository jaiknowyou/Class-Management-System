const CommonService = require('./Common')

class Tutor{
    constructor(id, name){
        this.id = id
        this.name = name
    }

    addClass = async(name, description, classCode)=>{
        try{
            await executePromisified(`insert into classes (name, description, classCode, createdBy) values("${name}", "${description}", "${classCode}", ${this.id})
                                        on duplicate key update active = 1, description = ${description}, name = ${name}`)
            return "Successfully Added."
        }catch(e){
            console.log(e)
        }
    }

    removeClass = async(classCode)=>{
        try{
            await executePromisified(`update classes set active = 0 where classCode = "${classCode}"`)
            // removing student from class as well
            await executePromisified(`update student_classes set active = 0 where classCode = "${classCode}"`)
            return "Class Removed"
        }catch(e){
            console.log(e)
            return "Error"
        }
    }
    
    addStudents = async(students, classCode)=>{
        try{
            for(let student of students){
                try{
                    await executePromisified(`insert into student_classes (studentId, classCode) values(${student.id}, "${classCode}")
                                                    on duplicate key update active = 1`)
                    res[student.id] = `Enrolled in ${classCode}`
                }catch(e){
                    res[student.id] = "Wrong student Id or Wrong classCode"
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
            await executePromisified(`update student_classes set active = 0 where classCode = "${classCode}" and studentId = ${student}`)
            return "Successfully removed"
        }catch(e){
            console.log(e)
            return "Please provide right student ID and classCode."
        }
    }

    addFile = async(name, description, classCode, fileType, file = null)=>{
        try{
            await executePromisified(`insert into files (name, description, classCode, file, fileType, uploadedBy) values("${name}", "${description}", "${classCode}", ${file}, ${fileType}, ${this.id})`)
            return "Successfully Added"
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
            let files = await CommonService.viewFiles(classCode, filter)
            return files
        }catch(e){
            console.log(e)
            return "Error"
        }
    }

}

module.exports = Tutor;