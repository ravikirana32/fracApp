/*global require, __dirname, console*/
var express = require('express'),
    bodyParser = require('body-parser'),
    errorhandler = require('errorhandler'),
    morgan = require('morgan'),
    fs = require("fs"),
    EmployeeProvider = require('./fractAppDB').EmployeeProvider;

    var app = require('express')();
    var http = require('http').Server(app);
    var io = require('socket.io')(http);

var options = {
    key: fs.readFileSync('cert/key.pem').toString(),
    cert: fs.readFileSync('cert/cert.pem').toString()
};

//var app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

io.on('connection', function(socket){
  socket.on('send data', function(msg){
    console.log(msg.image);
    msg.image="<img ng-src="+msg.image+">";
    console.log(msg.image);
    io.emit('send data', msg);
  });
});

//app.set('views', __dirname + '/../views/');
//disable layout
//app.set("view options", {layout: false});


/*app.use(function(req, res, next) {
    "use strict";
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
    res.header('Access-Control-Allow-Headers', 'origin, content-type');
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});*/



//app.listen(80);

//var server = http.createServer(options, app);
//server.listen(443);

var fractAppDB= new EmployeeProvider('localhost', 27017);

/*app.get('/admin', function(req, res){
    console.log("inside //////////");
  fractAppDB.findAll(function(error, users){
        console.log("&&&&&&&&&&&&&&&&&&&&");
        console.log(users);
        console.log(error);
      res.status(200).json({
        title : 'users',
        users : users,
    });
  });
});*/

app.get('/employee/new', function(req, res) {
    res.render('employee_new', {
        title: 'New Employee'
    });
});

//save new employee
/*app.post('/new', function(req, res){
    console.log("************************** inside employyye new");
    console.log(req.param('username'));
    console.log(req.param('password'));
    
    fractAppDB.save({
        username: req.param('username'),
        password: req.param('password')
    }, function( error, docs) {
        res.status(200).json();
    });
});*/

app.get('/login', function(req, res){
  fractAppDB.findAll(function(error, users){
      res.status(200).json({
        title : 'users',
        users : users,
    });
  });
});

app.post('/signup', function(req, res){
    
    fractAppDB.save({
        username: req.param('username'),
        password: req.param('password'),
        email:req.param('email')
    }, function( error, docs) {
        res.status(200).json();
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
