var express = require('express')
var app = express()
const routes = require('./App/Routes/routes')

require('./App/Config/db')

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

app.get('/ping', function(req, res){
    res.send('PONGING')
})

app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/api', routes)

