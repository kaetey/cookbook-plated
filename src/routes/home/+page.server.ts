import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    if (!locals.user) throw redirect(302, '/login');

    const res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=b');
    const data = await res.json();
    return { meals: data.meals, user: locals.user };
}
