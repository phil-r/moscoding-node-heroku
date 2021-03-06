var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 8080;
var ip = 'localhost';

io.on('connection', function(socket){
  socket.on('message', function(msg){
    io.emit('message', msg);
  });
});

app.use(express.static(__dirname+'/public'));

app.get('/', function(req, res){
    res.redirect('/chat.html');
});

http.listen(port, function () {
  console.log('Our app at http://' + ip + ':' + port);
});
