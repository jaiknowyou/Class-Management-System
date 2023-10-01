let CommonService = {}

require('dotenv')
const S3 = require('aws-sdk/clients/s3')
const fs = require('fs')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
})

CommonService.addUser = async(req, res)=>{
    try{
        let name = req.body.name
        if(typeof name != 'string' || name == '') return res.send(`Missing Parameter ---> name`)
        let type
        switch (req.body.type){
            case 'teacher':
                type = 1
                break
            case 'student':
                type = 2
                break
            default:
                return res.send("Invalid User type")
        }
        await executePromisified(`insert into Users (name, type) values('${name}', ${type})`)
        return res.send("Successfully Added.")
    }catch(e){
        console.log(e)
        return res.send("Error.")
    }
}

CommonService.getUserByType = async(req, res)=>{
    try{
        let type
        switch (req.query.type){
            case 'teacher':
                type = 1
                break
            case 'student':
                type = 2
                break
            default:
                return res.send("Invalid User type")
        }
        let result = await executePromisified(`select id, name from Users where type = ${type}`)
        return res.send(result)
    }catch(e){
        console.log(e)
        return res.send("error")
    }
}

CommonService.commonCheck = function (req, req_data, key = 'body') {
    if (!req_data.length) {
        return 0
    }
    let blank_array = []
    for (let count = 0; count < req_data.length; count++) {
        if (!req[key] || req[key][req_data[count]] === 'undefined' || req[key][req_data[count]] === undefined || req[key][req_data[count]] === null || (typeof req[key][req_data[count]] == 'string' && req[key][req_data[count]].trim() == '') || req[key][req_data[count]] === ' ' || req[key][req_data[count]] === '') {
            blank_array.push(req_data[count])
        }
    }
    if (blank_array.length) {
        return blank_array.join(',')
    }
    return 0
}

CommonService.viewFiles = async(classCode, filter)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            let query = `select name, description, file, fileType from files
                        where classCode = '${classCode}' `
            if(filter){
                if(filter.name) query += `and name = '${filter.name}' `
                if(filter.type) query += `and fileType = '${filter.type}'`
            }
            let files = await executePromisified(query)
            return resolve(files)
        }catch(e){
            console.log(e)
            reject()
        }
    })
}

CommonService.uploadToS3 = async(file)=>{
    return new Promise((resolve, reject)=>{
        try{
            let fileStream = fs.createReadStream(file.file)
            return s3.upload({
                Bucket: bucketName,
                Body: fileStream,
                Key: `${file.classCode+file.name}`,
                ACL: 'public-read'
            }).promise()
        }catch(e){
            console.log(e)
            reject(e)
        }
    })
}

module.exports = CommonService