
let StudentController = {}

StudentController.viewClasses = async(req, res)=>{
    try{
        let classes = await req.user.viewClasses()
        res.send(classes)
    }catch(e){
        console.log(e)
        res.send("Request Failed.")
    }
}

StudentController.viewFiles = async(req, res)=>{
    try{
        let files = await req.user.viewFiles(req.body.classCode, req.body.filter)
        res.send(files)
    }catch(e){
        console.log(e)
        res.send("Request Failed.")
    }
}

module.exports = StudentController