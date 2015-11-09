shortid = require('shortid')
fs = require('fs')
path = require('path')
var mkdirp = require('mkdirp');

var daemon = require("daemonize2").setup({
    main: "app.js",
    name: "Artyfact",
    pidfile: "artyfact.pid"
});

switch (process.argv[2]) {

    case "start":
        daemon.start();
        break;

    case "stop":
        daemon.stop();
        break;
    case "restart":
        daemon.stop();
        daemon.start();
        break;
    case "create":
        var id = shortid.generate()  + shortid.generate() 
        if(process.argv[3] != null){
            console.log(process.argv[3], id)
            mkdirp.sync(path.join(__dirname, 'uploads', id, process.argv[3]))
        }
        break;

    default:
        console.log("Usage: [start|stop|create]");
}
