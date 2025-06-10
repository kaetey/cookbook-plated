<script lang="ts">
	import { onMount } from 'svelte';
	import { favorites } from '$lib/stores/favorites';
	import { get } from 'svelte/store';

	let favMeals = [];
	let loading = true;

	onMount(async () => {
		const favIds = get(favorites);
		const fetches = favIds.map(id =>
			fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then(res => res.json())
		);

		const results = await Promise.all(fetches);
		favMeals = results.map(r => r.meals[0]);
		loading = false;
	});
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="mb-4 text-2xl font-bold text-center">Your Favorites</h1>

	{#if loading}
		<p class="text-center">Loading...</p>
	{:else if favMeals.length === 0}
		<p class="text-center">You haven’t favorited anything yet.</p>
	{:else}
		<div class="flex flex-wrap justify-center gap-6">
			{#each favMeals as meal}
				<a href={`/recipe/${meal.idMeal}`} class="card bg-base-100 shadow-md w-full sm:w-80 hover:shadow-lg transition">
					<figure class="px-4 pt-4">
						<img src={meal.strMealThumb} alt={meal.strMeal} class="rounded-lg object-cover h-40 w-full" />
					</figure>
					<div class="card-body">
						<h2 class="card-title">{meal.strMeal}</h2>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>
