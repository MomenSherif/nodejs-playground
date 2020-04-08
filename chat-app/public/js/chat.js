const socket = io();
const form = document.querySelector('form');
socket.on('message', ({ message }) => {
  console.log(message);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = form.message.value.trim();
  if (!message) return;

  socket.emit('sendMessage', { message }, (error) => {
    if (error) return console.log(error);
    console.log('Message Delivered');
  });
  form.message.value = '';
});

document.getElementById('send-location').addEventListener('click', (e) => {
  if (!navigator.geolocation)
    return alert('Geolocation is not supproted by your browser');

  navigator.geolocation.getCurrentPosition(({ coords }) => {
    const { latitude, longitude } = coords;
    socket.emit('sendLocation', { latitude, longitude }, () => {
      console.log('Location Shared');
    });
  });
});
