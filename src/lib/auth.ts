import crypto from 'crypto';

const USERS = [
  { id: '1', username: 'kate', password: 'kate' },
];

const sessions = new Map(); // sessionToken => { userId, expires }

export async function validateCredentials(username, password) {
  const user = USERS.find(u => u.username === username && u.password === password);
  return user ? user.id : null;
}

export async function createSession(userId) {
  const token = crypto.randomUUID();
  const session = { userId, expires: Date.now() + 1000 * 60 * 60 * 24 }; // 1 day
  sessions.set(token, session);
  return token;
}

export async function validateSession(token) {
  const session = sessions.get(token);
  if (!session) return null;
  if (session.expires < Date.now()) {
    sessions.delete(token);
    return null;
  }
  const user = USERS.find(u => u.id === session.userId);
  return user ? { user } : null;
}