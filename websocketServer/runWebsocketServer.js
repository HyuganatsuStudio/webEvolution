let express = require('express');
let https = require('https');
let fs = require('fs');
let socket_io = require('socket.io');
let path = require('path');
let expressServer = require('../expressServer.js');

// 把../public目录添加到express静态管理中,这个目录下的
// URL静态文件请求都可以返回文件,如果这个目录下存在的话
// let app = express();
// app.use(express.static(path.join(__dirname, '../public')));

//tls key and crt
let privateKey  = fs.readFileSync(__dirname + '/../ssl_cert/private.pem', 'utf8');
let certificate = fs.readFileSync(__dirname + '/../ssl_cert/my.crt', 'utf8');
let credentials = {key: privateKey, cert: certificate};

// Create https server with Express.
let httpsServer = https.createServer(credentials,expressServer);

// using socket.io to connect the clients via websocket
let io = socket_io(httpsServer);
numUsers = 0;
// if connected , execute function
io.on('connection', function(socket){
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

// listen port
httpsServer.listen(7000, function(){
  console.log('listening on *:7000');
});