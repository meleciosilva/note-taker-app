function getExistingNotes() {
  let notes = localStorage.getItem("notes");
  if (!notes) return null;
  return JSON.parse(notes);
}

function getNoteId() {
  let noteObject = getExistingNotes();
  if (!noteObject) return 1;
  const keysArray = Object.keys(noteObject);
  const numberKeys = keysArray.map((key) => Number(key));
  return Math.max(...numberKeys) + 1;
}
