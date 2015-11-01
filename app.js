var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 8080;
var ip = 'localhost';

var messages = []; // 1
var channels = [
  {name: "Public", path:'/'},
  {name: "Random", path:'/random'},
  {name: "MosCoding", path:'/mcs'}
];

io.on('connection', function(socket){
  socket.emit('messages', messages); // 3
  socket.emit('channels', channels);
  socket.on('message', function(msg){ // сюда приходят сообщения
    messages.push(msg); // 2
    io.emit('message', msg);
  });
});

app.use(express.static(__dirname+'/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname+'/public/chat.html');
});

app.get('/:id', function(req, res){
  res.sendFile(__dirname+'/public/chat.html');
});



http.listen(port, function () {
  console.log('Our app at http://' + ip + ':' + port);
});
