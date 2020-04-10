const socket = io();

// Elements
const $messageForm = document.querySelector('form');
const $messageFormInput = $messageForm.message;
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.getElementById('send-location');
const $messages = document.getElementById('messages');
const $sidebar = document.getElementById('sidebar');

// Options
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const autoScroll = () => {
  // New message
  const $newMessage = $messages.lastElementChild;

  // Height of the new message
  const newMessageMargin = parseInt(getComputedStyle($newMessage).marginBottom);
  const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

  // Visible height
  const visibleHeight = $messages.offsetHeight;

  // Height of messages container
  const containerHeight = $messages.scrollHeight;

  // ScrollOffset
  const scrollOffset = $messages.scrollTop + visibleHeight;

  if (containerHeight - newMessageHeight <= scrollOffset) {
    $messages.scrollTop = $messages.scrollHeight;
  }
};

socket.on('message', ({ username, text, createdAt }) => {
  const html = `
    <div class="message">
      <p>
        <span class="message__name">${username}</span>
        <span class="message__meta">${moment(createdAt).format('h:mm a')}</span>
      </p>
      <p>${text}</p>
    </div>
  `;
  $messages.insertAdjacentHTML('beforeend', html);
  autoScroll();
});

socket.on('locationMessage', ({ username, url, createdAt }) => {
  const html = `
    <div>
      <p>
        <span class="message__name">${username}</span>
        <span class="message__meta">${moment(createdAt).format('h:mm a')}</span>
      </p>
     <a href=${url} target="_blank">My current location</a>
    </div>
  `;
  $messages.insertAdjacentHTML('beforeend', html);
  autoScroll();
});

socket.on('roomData', ({ room, users }) => {
  const html = `
    <h2 class="room-title">${room}</h2>
    <h3 class="list-title">Users</h3>
    <ul class="users">
      ${users.map((user) => `<li>${user.username}</li>`).join('')}
    </ul>
  `;
  $sidebar.innerHTML = html;
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

socket.emit('join', { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = '/';
  }
});
