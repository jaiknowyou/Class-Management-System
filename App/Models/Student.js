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
            let result = await executePromisified(`select active from student_classes where classCode = '${classCode}' and studentId = ${this.id}`)
            let files
            if(result && result[0] && result[0].active) files = await CommonService.viewFiles(classCode, filter)
            else files = "Student Not enrolled in this Class."
            return files
        }catch(e){
            console.log(e)
            return "Error"
        }
    }
}

module.exports = Student;