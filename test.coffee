fs = require 'fs'
request = require 'request'

formData = my_file: fs.createReadStream(__dirname + '/README.md')
request.post {
  url: 'http://localhost:3000/NyysIZtMg/birds/123'
  formData: formData
}, (err, httpResponse, body) ->
  if err
    return console.error('upload failed:', err)
  console.log 'Upload successful!  Server responded with:', body
  return
