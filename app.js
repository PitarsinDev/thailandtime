const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const moment = require('moment-timezone');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3000;

// กำหนดโซนเวลาเป็น Asia/Bangkok (ไทย)
moment.tz.setDefault('Asia/Bangkok');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  console.log('Client connected');

  // ส่งเวลาปัจจุบันในไทยไปยังไคลเอนต์ทุกครั้งที่มีการเชื่อมต่อใหม่
  const thaiTime = moment().format('HH:mm:ss');
  socket.emit('thaiTime', { thaiTime });

  // ส่งเวลาปัจจุบันในไทยไปยังทุกครั้งที่มีการเปลี่ยนแปลงที่มาจาก server
  setInterval(() => {
    const thaiTime = moment().format('HH:mm:ss');
    socket.emit('thaiTime', { thaiTime });
  }, 1000);
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
