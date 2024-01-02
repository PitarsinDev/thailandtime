// public/js/script.js
document.addEventListener('DOMContentLoaded', function () {
    const socket = io();
  
    socket.on('thaiTime', (data) => {
      document.getElementById('thai-time').innerText = `${data.thaiTime}`;
    });
  });
  