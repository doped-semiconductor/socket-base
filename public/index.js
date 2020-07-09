var socket = io();
var curr_room;
var x = document.getElementById('1')//myroom
x.addEventListener('click',(ev)=>{
    socket.emit('join',document.getElementById('name').value)
    curr_room = document.getElementById('name').value
})
var y = document.getElementById('2')//join someone else
y.addEventListener('click', (ev)=>{
    curr_room = document.getElementById("roomname").value
    socket.emit('joinfriend',curr_room,document.getElementById("name").value)
})
//to send message
document.getElementById("send").addEventListener('click', (ev) => {
    socket.emit('sendmsg',curr_room, document.getElementById("chat").value, document.getElementById("name").value)
    console.log('sent chat: ',curr_room)
})
//add message event
socket.on('getmsg', (sender,msg) => {
    addText(sender+": "+msg)
})
function addText(data){
    var p = document.createElement('p')
    p.appendChild(document.createTextNode(data))
    var m = document.getElementById('msg')
    m.appendChild(p)
}