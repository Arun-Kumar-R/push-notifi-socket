// const app = require('express')();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);

// app.get('/', (req, res) => {
//     res.send('Welcome to Notification');
// });

// io.on('connection', (socket) => {
//     socket.on('new_notification', (data) => {
//         console.log(data.title, data.message);
//         io.sockets.emit('show_notification', {
//             title: data.title,
//             message: data.message,
//             icon: data.icon,
//         });
//     });
// });

// http.listen(3000, () => {
//     console.log('listening on localhost:3000');
// });


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const app = express();

app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = 3000;

const server = app.listen(PORT, () => {
    console.log("Magic Happens on PORT:", PORT);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/' + 'index.html')
});
const io = socket(server);

io.on('connection', (soc) => {
    console.log('Socket connection Established');

    soc.on('disconnect', () => {
        console.log('Socket disconnected...');
    });

    soc.on('send-notification', (data) => {
        io.emit('new-notification', data);
    });
});
