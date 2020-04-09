const users = [];

const addUser = ({ id, username, room }) => {
  // Clean Data
  username = username.toLowerCase().trim();
  room = room.toLowerCase().trim();

  // Validate Data
  if (!username || !room) {
    return {
      error: 'Username and room are required',
    };
  }

  // Check for existing user
  const existingUser = users.some((user) => {
    return user.room === room && user.username === username;
  });

  // Validate username
  if (existingUser) {
    return {
      error: 'Username is in use',
    };
  }

  // Store User
  const user = { id, username, room };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

const getUsersInRoom = (room) => {
  return users.filter((user) => user.room === room);
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};
