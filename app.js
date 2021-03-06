// Generated by CoffeeScript 1.9.3
(function() {
  var app, bodyParser, express, fs, http, mkdirp, multer, multipart, mv, path, test, up;

  express = require('express');

  http = require('http');

  multer = require('multer');

  bodyParser = require('body-parser');

  fs = require('fs');

  path = require('path');

  app = express();

  path = require('path');

  mkdirp = require('mkdirp');

  multipart = require('connect-multiparty')();

  app.get('/', function(req, res) {
    return res.send('Artyfact is currently running');
  });

  up = multer({
    dest: './uploads/'
  });

  console.log(fs.readdirSync(__dirname));

  mv = require('mv');

  test = function(req, res, next) {
    var buildNumber, error, project, uuid;
    console.log(req.files);
    uuid = req.params.uuid;
    project = req.params.project;
    buildNumber = req.params.buildNumber;
    console.log(uuid, project, buildNumber);
    try {
      fs.statSync(path.join(__dirname, 'uploads', uuid)).isDirectory();
      return multipart(req, res, next);
    } catch (_error) {
      error = _error;
      return res.send('There was an error finding a project matching that ID');
    }
  };

  app.post('/:uuid/:project/:buildNumber', test, function(req, res, next) {
    var buildNumber, project, uuid;
    uuid = req.params.uuid;
    project = req.params.project;
    buildNumber = req.params.buildNumber;
    mv(req.files.my_file.path, path.join(__dirname, 'uploads', uuid, project, buildNumber, req.files.my_file.originalFilename), {
      mkdirp: true
    }, function() {
      return console.log('files copied');
    });
    console.log(JSON.stringify(req.files.my_file));
    return res.send('File uplaoded');
  });

  app.listen(3000);

}).call(this);
