let CommonService = require('../Models/Common')

let TutorController = {}


TutorController.addClass= async(req, res)=>{
    // CommonService.commonCheck();
    try{
        let added = await req.user.addClass(req.body.name, req.body.description, req.body.classCode)
        res.send(added)
    }catch(e){
        console.log(e)
        res.send("Error: Check if description is not too long.")
    }    
}

TutorController.addStudents = async(req, res)=>{
    try{
        let result = await req.user.addStudents(req.body.students, req.body.classCode)
        res.send(result)
    }catch(e){
        console.log(e)
        res.send("Error")
    }
}

TutorController.addFile = async(req, res)=>{
    try{
        let fileType = req.body.fileType.toLowerCase()
        switch (fileType){
            case 'audio':
                fileType = 1
                break
            case 'video':
                fileType = 2
                break
            case 'image':
                fileType = 3
                break
            case 'url':
                fileType = 4
                break
            default:
                res.send("Invalid File type.")
        }
        await req.user.addFile(req.body.name, req.body.description, req.body.classCode, fileType, req.body.file ? req.body.file: null)
        res.send("Successfully Added.")
    }catch(e){
        console.log(e)
        res.send("Error")
    }
}

TutorController.viewClasses = async(req, res)=>{
    try{
        let classes = await req.user.viewClasses()
        res.send(classes)
    }catch(e){
        console.log(e)
        res.send("Error")
    }
}

TutorController.viewFiles = async(req, res)=>{
    try{
        let files = await req.user.viewFiles(req.body.classCode, req.body.filter)
        res.send(files)
    }catch(e){
        console.log(e)
        res.send("Error")
    }
}

TutorController.removeStudent = async(req, res)=>{
    try{
        let result = await req.user.removeStudent(req.body.studentId, req.body.classCode)
        res.send(result)
    }catch(e){
        console.log(e)
        res.send("Error")
    }
}

TutorController.removeClass = async(req, res)=>{
    try{
        let result  = await req.user.removeClass(req.body.classCode)
        res.send(result)
    }catch(e){
        console.log(e)
        res.send("Error")
    }
}

module.exports = TutorController