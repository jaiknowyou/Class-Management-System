var express = require('express')
var app = express()
const routes = require('./App/Routes/routes')
var multer = require('multer')
var path = require('path')
// var upload = multer({dest: 'uploads'})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file)
      cb(null, 'Uploads')      //you tell where to upload the files,
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
  
var upload = multer({storage: storage,
    onFileUploadStart: function (file) {
    console.log(file.originalname + ' is starting ...')
    },
});

require('./App/Config/db')

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

app.get('/ping', function(req, res){
    return res.send('PONGING')
})

app.post('/api/:userId/tutor/addFile', upload.single("file"), function(req, res, next){
    if (!req.file) {
        console.log('No file uploaded.')
    }
    console.log(req.file, req.body)
    next()
})

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));
app.use('/api', routes)

