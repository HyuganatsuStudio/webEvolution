let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let path = require('path');

// 把../public目录添加到express静态管理中,这个目录下的
// URL静态文件请求都可以返回文件,如果这个目录下存在的话
app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', function(socket){
    console.log('a user connected');
    socket.emit('w',"fdsa");
    socket.on('w',(data) => {
    console.log(data);
  })
});

http.listen(7000, function(){
  console.log('listening on *:7000');
});