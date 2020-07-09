var express = require('express');
var app = express();
var http = require('http').createServer(app);
var path = require('path');
var io = require('socket.io')(http);
var fs = require('fs')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send(path.join(__dirname + '/index.html'));
});

io.on('connection', (socket) => {
    console.log('connected id: ',socket.id);
    socket.on('joinfriend', (room,name) => {
        console.log(name,' wants to join ',room)
        socket.join(room)
        console.log(name,' has joined ',room)
        io.to(room).emit('getmsg','Bot',name+' has joined this room')
    })
    socket.on('join',(room)=>{
        console.log(room,' wants to go to their room')
        socket.join(room)
        io.to(room).emit('getmsg','Bot','You have joined your own room')
        console.log(room, 'is in their room')
    })
    socket.on('sendmsg',(room, msg, sender) => {
        io.in(room).emit('getmsg',sender,msg)       
    })
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});