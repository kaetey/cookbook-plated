<script lang="ts">
	import { favorites } from '$lib/stores/favorites';
	const { data } = $props();

	function toggleFavorite(id: string) {
		favorites.update((favs) => (favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id]));
	}

	function isFav(id: string) {
		return $favorites.includes(id);
	}
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="mb-4 text-2xl font-bold text-center">Browse Recipes</h1>
	<div class="flex flex-wrap justify-center gap-6">
		{#each data.meals as meal}
			<div class="card bg-base-100 w-full shadow-md transition hover:shadow-lg sm:w-80">
				<a href={`/recipe/${meal.idMeal}`}>
					<figure class="px-4 pt-4">
						<img src={meal.strMealThumb} alt={meal.strMeal} class="h-40 w-full rounded-lg object-cover" />
					</figure>
				</a>
				<div class="card-body">
					<div class="flex items-center justify-between">
						<h2 class="card-title">{meal.strMeal}</h2>
						<!-- Keep button outside of the link -->
						<button onclick={() => toggleFavorite(meal.idMeal)} class="text-xl text-red-500" title="Toggle favorite">
							<span class={`iconify ${isFav(meal.idMeal) ? 'mdi--heart' : 'mdi--heart-outline'}`}></span>
						</button>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
