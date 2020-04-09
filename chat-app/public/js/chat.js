const socket = io();

// Elements
const $messageForm = document.querySelector('form');
const $messageFormInput = $messageForm.message;
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.getElementById('send-location');
const $messages = document.getElementById('messages');

socket.on('message', ({ text, createdAt }) => {
  const html = `
    <div>
      <p>${moment(createdAt).format('h:mm a')} - ${text}</p>
    </div>
  `;
  $messages.insertAdjacentHTML('beforeend', html);
});

socket.on('locationMessage', ({ url, createdAt }) => {
  const html = `
    <div>
     <span>${moment(createdAt).format('h:mm a')}</span>
      - <a href=${url} target="_blank">This is my location</a>
    </div>
  `;
  $messages.insertAdjacentHTML('beforeend', html);
});

$messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = $messageFormInput.value.trim();
  if (!message) return;
  $messageFormButton.disabled = true;

  socket.emit('sendMessage', { message }, (error) => {
    if (error) return console.log(error);
    $messageFormButton.disabled = false;
    $messageFormInput.value = '';
    $messageFormInput.focus();
  });
});

$sendLocationButton.addEventListener('click', (e) => {
  if (!navigator.geolocation)
    return alert('Geolocation is not supproted by your browser');

  $sendLocationButton.disabled = true;

  navigator.geolocation.getCurrentPosition(({ coords }) => {
    const { latitude, longitude } = coords;
    socket.emit('sendLocation', { latitude, longitude }, () => {
      $sendLocationButton.disabled = false;
    });
  });
});
