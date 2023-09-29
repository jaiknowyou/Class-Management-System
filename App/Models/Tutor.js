import CommonService from "./Common"

class Tutor{
    constructor(id, name){
        this.id = id
        this.name = name
    }

    addClass = async(name, description, classCode)=>{
        try{
            await executePromisified(`insert into classes (name, description, classCode, createdBy) values(${name}, ${description}, ${classCode}, ${this.id})`)
            return true
        }catch(e){
            console.log(e)
        }
    }

    removeClass = async(classCode)=>{
        try{
            await executePromisified(`update classes set active = 0 where classCode = ${classCode}`)
            return true
        }catch(e){
            console.log(e)
        }
    }
    
    addStudents = async(students, classCode)=>{
        try{
            let exist = await executePromisified(`select id from users where id in (${students})`)
            for(let student of exist){
                let res = await executePromisified(`insert into student_classes (studentId, classCode) values(${student}, ${classCode})
                                                    on duplicate key update active = 1)`)
                if(exist) res[student] = `Enrolled in ${classCode}`
            }
        }catch(e){
            console.log(e)
        }
    }

    removeStudent = async(student, classCode)=>{
        try{
            await executePromisified(`update student_classes set active = 0 where classCode = ${classCode} and studentId = ${student}`)
            return true
        }catch(e){
            console.log(e)
        }
    }

    addFile = async(name, description, classCode, file = null,  fileType)=>{
        try{
            await executePromisified(`insert into files (name, description, classCode, file, fileType, uploadedBy) values(${name}, ${description}, ${classCode}, ${file}, ${fileType})`)
            return true
        }catch(e){
            console.log(e)
        }

    }

    viewClasses = async()=>{
        try{
            let classes = await executePromisified(`select name, classCode from classes where createdBy = ${this.id}`)
            return classes
        }catch(e){
            console.log(e)
        }
    }

    viewFiles = async(classCode, filter)=>{
        try{
            let files = await CommonService.viewFiles(classCode, filter)
            return files
        }catch(e){
            console.log(e)
        }
    }

}

export default Tutor;