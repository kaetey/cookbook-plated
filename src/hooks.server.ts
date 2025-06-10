import { validateSession } from '$lib/auth';

export async function handle({ event, resolve }) {
  const token = event.cookies.get('session');
  if (token) {
    const session = await validateSession(token);
    if (session) event.locals.user = session.user;
  }
  return resolve(event);
}