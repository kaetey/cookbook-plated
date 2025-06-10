import { redirect, fail } from '@sveltejs/kit';
import { validateCredentials, createSession } from '$lib/auth';

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const username = data.get('username');
        const password = data.get('password');

        const userId = await validateCredentials(username, password);
        if (!userId) return fail(401, { error: 'Invalid credentials' });

        const token = await createSession(userId);
        cookies.set('session', token, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });

        throw redirect(302, '/home');
    }
};