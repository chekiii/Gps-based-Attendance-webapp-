// RoomManager.js
const rooms = {};

export function createRoom(code, location, teacherId, currentclass, session) {
  if (rooms[code]) return false;
  rooms[code] = {
    students: new Set(),
    location,
    teacherId,
    currentclass,
    session,
  };
  return true;
}

export function closeRoom(code) {
  if (rooms[code]) {
    delete rooms[code];
    return true;
  }
  return false;
}

export function getRoom(code) {
  return rooms[code] || null;
}

export function joinRoom(code, student) {
  if (rooms[code]) {
    rooms[code].students.add(student);
    return true;
  }
  return false;
}
