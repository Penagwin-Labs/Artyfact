express = require('express')
http = require('http')
multer = require('multer')
bodyParser = require('body-parser')
fs = require('fs')
path = require('path')
app = express()
path = require 'path'
mkdirp = require('mkdirp')
multipart = require('connect-multiparty')()
app.get '/', (req, res) ->  res.send 'Artyfact is currently running'
up = multer({ dest: './uploads/'})
console.log fs.readdirSync(__dirname)
#app.use authenticate
mv = require('mv')

test = (req, res, next)->

    console.log req.files
    uuid = req.params.uuid
    project = req.params.project
    buildNumber = req.params.buildNumber
    console.log uuid, project, buildNumber
    try
        fs.statSync(path.join __dirname, 'uploads', uuid).isDirectory()
        multipart req, res, next
    catch error
        res.send 'There was an error finding a project matching that ID'


app.post '/:uuid/:project/:buildNumber',  test, (req, res, next) ->
    uuid = req.params.uuid
    project = req.params.project
    buildNumber = req.params.buildNumber
    mv req.files.my_file.path, path.join(__dirname, 'uploads', uuid, project, buildNumber, req.files.my_file.originalFilename), {mkdirp: true}, ()-> console.log('files copied')
    console.log JSON.stringify req.files.my_file
    res.send 'File uplaoded'
app.listen 3000
