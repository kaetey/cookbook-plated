// src/routes/recipe/[id]/+page.server.ts
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`);
    const data = await res.json();

    if (!data.meals || data.meals.length === 0) {
        throw error(404, 'Recipe not found');
    }

    const meal = data.meals[0];
    return { meal };
}
