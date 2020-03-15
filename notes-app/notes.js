const fs = require('fs');

const getNotes = () => loadNotes();

const getNote = title => {
  const notes = loadNotes();
  return notes.find(note => note.title === title);
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const hasDuplicate = notes.find(note => note.title === title);

  if (hasDuplicate) return false;

  notes.push({ title, body });
  saveNotes(notes);
  return true;
};

const removeNote = title => {
  const notes = loadNotes();
  const hasNote = notes.find(note => note.title === title);
  if (!hasNote) return false;

  const updatedNotes = notes.filter(note => note.title !== title);
  saveNotes(updatedNotes);
  return true;
};

const saveNotes = notes => {
  fs.writeFileSync('notes.json', JSON.stringify(notes));
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  getNotes,
  getNote,
  addNote,
  removeNote
};
