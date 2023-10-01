let CommonService = require('./Common')

class Student{
    constructor(id, name){
        this.id = id
        this.name = name
    }

    viewClasses = async()=>{
        try{
            let query = `select name, c.classCode from classes c
                        right join student_classes sc on sc.studentId = ${this.id} and sc.classCode = c.classCode and sc.active = 1
                        where c.active = 1`
            let classes = await executePromisified(query)
            return classes
        }catch(e){
            console.log(e)
            return "Error"
        } 
    }

    viewFiles = async(classCode, filter = undefined)=>{
        try{
            let files = await CommonService.viewFiles(classCode, filter)
            return files
        }catch(e){
            console.log(e)
            return "Error"
        }
    }
}

module.exports = Student;