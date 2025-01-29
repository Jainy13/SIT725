let express = require('express');
let app = express();
let port = process.env.port || 3000;
require('./dbConnection');
let router = require('./routers/router');
const { Socket } = require('socket.io');
let http = require('http').createServer(app); // Updated to use http
let io = require('socket.io')(http); // Updated to use socket.io with http

app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/cat', router);

io.on('connection', (socket) => {
    console.log('a client is connected'); // Updated log message
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    setInterval(() => {
        let randomNumber = parseInt(Math.random() * 10);
        socket.emit('number', randomNumber); // Emit random number
        console.log('Emitting Number ' + randomNumber);
    }, 1000);
});

http.listen(port, () => { // Updated to use http.listen
    console.log('express server started');
});