let express = require('express');
var https = require('https');
var fs = require('fs');
let socket_io = require('socket.io');
let path = require('path');

// 把../public目录添加到express静态管理中,这个目录下的
// URL静态文件请求都可以返回文件,如果这个目录下存在的话
let app = express();
app.use(express.static(path.join(__dirname, '../public')));

//tls key and crt
var privateKey  = fs.readFileSync(__dirname + '/../ssl_cert/private.pem', 'utf8');
var certificate = fs.readFileSync(__dirname + '/../ssl_cert/my.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

// Create https server with Express.
var httpsServer = https.createServer(credentials,app);

// using socket.io to connect the clients via websocket
let io = socket_io(httpsServer);

// if connected , execute function
io.on('connection', function(socket){
    console.log('a user connected');
    //send message "fdsa" in 'w' emit event
    //json:['w','fdsa']
    socket.emit('w',"fdsa");
    //if received data in emit event (json:['w',data])
    socket.on('w',(data) => {
    console.log(data);
  })
});

// listen port
httpsServer.listen(7000, function(){
  console.log('listening on *:7000');
});