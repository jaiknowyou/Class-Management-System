let CommonService = require('../Models/Common')

let TutorController = {}


TutorController.addClass= async(req, res)=>{
    // CommonService.commonCheck();
    try{
        let added = await req.user.addClass(req.body.name, req.body.description, req.body.classCode)
        if(added) res.send("Successfully Added.")
    }catch(e){
        console.log(e)
    }    
}

TutorController.addStudents = async(req, res)=>{
    try{
        await req.user.addStudents(req.body.students, req.body.classCode)
        res.send("Successfully Added.")
    }catch(e){
        console.log(e)
    }
}

TutorController.addFile = async(req, res)=>{
    try{
        await req.user.addFile(req.body.students, req.body.classCode) // Change Arguments
        res.send("Successfully Added.")
    }catch(e){
        console.log(e)
    }
}

TutorController.viewClasses = async(req, res)=>{
    try{
        let classes = await req.user.viewClasses()
        res.send(classes)
    }catch(e){
        console.log(e)
    }
}

TutorController.viewFiles = async(req, res)=>{
    try{
        let files = await req.user.viewFiles(req.body.classCode)
        res.send(files)
    }catch(e){
        console.log(e)
    }
}

TutorController.removeStudent = async(req, res)=>{
    try{
        await req.user.removeStudent(req.body.studentId, req.body.classCode)
        res.send("Successfully removed")
    }catch(e){
        console.log(e)
    }
}

TutorController.removeClass = async(req, res)=>{
    try{
        await req.user.removeClass(req.body.classCode)
        res.send("Successfully removed")
    }catch(e){
        console.log(e)
    }
}

export default TutorController