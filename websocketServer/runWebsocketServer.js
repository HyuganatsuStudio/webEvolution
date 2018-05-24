#!/usr/bin/env node
let http = require('http');
let https = require('https');
let fs = require('fs');
let socket_io = require('socket.io');
let path = require('path');
let expressServer = require('../expressServer.js');

//===============http server===========================================
// Create http server with Express.
let httpServer = http.createServer(expressServer);
httpServer.listen('80', ()=> {
  console.log('http listening on *:' + '80');
});
// using socket.io to allowed client to connect to server via websocket
let io2 = socket_io(httpServer);
runWebsocketService(io2);
//======================================================================

//===============https server===========================================
//tls key and crt
let privateKey  = fs.readFileSync(__dirname + '/../ssl_cert/private.pem', 'utf8');
let certificate = fs.readFileSync(__dirname + '/../ssl_cert/my.crt', 'utf8');
let credentials = {key: privateKey, cert: certificate};

//  Get port from environment and store in Express.
let Port = normalizePort(process.env.PORT || '443');
expressServer.set('port',Port);

// Create https server with Express.
let httpsServer = https.createServer(credentials,expressServer);
// listen port
httpsServer.listen(Port,()=> {
  console.log('https listening on *:' + Port);
});

// using socket.io to allowed client to connect to server via websocket
let io = socket_io(httpsServer);
runWebsocketService(io);
//=======================================================================

//=====================function definition===============================
//Normalize a port into a number, string, or false.
function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }normalizePort
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}
// start websocket service with socket.io 
function runWebsocketService(io){
  // if connected , execute function
  io.on('connection', function(socket){
    numUsers = 0;
    let addedUser = false;
    // when the client emits 'add user', this listens and executes
    socket.on('add user', (username) => {
      if (addedUser) return;

      // we store the username in the socket session for this client
      socket.username = username;
      ++numUsers;
      addedUser = true;
      socket.emit('login', {
        numUsers: numUsers
      });
      // echo globally (all clients) that a person has connected
      socket.broadcast.emit('user joined', {
        username: socket.username,
        numUsers: numUsers
      });
    });

    // when the client emits 'new message', this listens and executes
    socket.on('new message', (data) => {
      // we tell the client to execute 'new message'
      socket.broadcast.emit('new message', {
        username: socket.username,
        message: data
      });

      console.log(data);
    })
  });
}
