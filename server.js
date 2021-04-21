const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.send('Welcome to Notification');
});

io.on('connection', (socket) => {
    socket.on('new_notification', (data) => {
        console.log(data.title, data.message);
        io.sockets.emit('show_notification', {
            title: data.title,
            message: data.message,
            icon: data.icon,
        });
    });
});

http.listen(3000, () => {
    console.log('listening on localhost:3000');
});