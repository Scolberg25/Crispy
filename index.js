const express = require('express');
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3000;
const fs = require('fs');
const path = require("path");

function write(message) {
   fs.appendFile('log.txt', message,  function (err) {
   if (err) throw err;
      console.log('Saved!');
});
}

app.use(express.static('public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/index.html');
});

app.get('/chat', (req, res) => {
   res.sendFile(__dirname + '/chat.html');
});

app.get('/rules', (req, res) => {
   res.sendFile(__dirname + '/rules.html');
});

app.get('*', function(req, res){
   res.status(404).send('404 error!');
   res.status(500).send('500 error!');
});

server.listen(PORT, () => {
   console.log('Server is running on port: ' + PORT);
});

io.on('connection', (socket) => {
   socket.on('disconnect', () => {
      io.emit('send message', {message: `${socket.username} has left the chat`, user:"Welcome Bot"})
   }); 

   socket.on('new message', (msg) => {
      console.log(msg)
      io.emit('send message', {message: msg, user: socket.username});
   });

   socket.on('new user', (usr) => {
      socket.username = usr;
      io.emit('send message', {message: `${socket.username} has joined the chat`, user:"Welcome Bot"})
   });
});