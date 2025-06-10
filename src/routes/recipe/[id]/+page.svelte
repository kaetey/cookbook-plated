<script>
	const { data } = $props();

	function getIngredients(meal) {
		const ingredients = [];
		for (let i = 1; i <= 20; i++) {
			const ingredient = meal[`strIngredient${i}`];
			const measure = meal[`strMeasure${i}`];
			if (ingredient && ingredient.trim()) {
				ingredients.push(`${measure} ${ingredient}`.trim());
			}
		}
		return ingredients;
	}
</script>

<div class="container mx-auto px-4 py-8">
	<a href="/home" class="btn btn-sm btn-ghost mb-6">← Back to recipes</a>

	<div class="flex flex-col md:flex-row gap-8">
		<div class="flex-shrink-0 md:w-[40%]">
			<img src={data.meal.strMealThumb} alt={data.meal.strMeal} class="rounded-lg w-full object-cover" />
		</div>
		<div class="md:w-1/2">
	        <h1 class="text-3xl font-bold mb-6">{data.meal.strMeal}</h1>
			<h2 class="text-xl font-semibold mb-2">Ingredients</h2>
			<ul class="list-disc list-inside mb-6">
				{#each getIngredients(data.meal) as item}
					<li>{item}</li>
				{/each}
			</ul>

			<h2 class="text-xl font-semibold mb-2">Instructions</h2>
			<p class="whitespace-pre-line text-base-content/90">{data.meal.strInstructions}</p>
		</div>
	</div>
</div>
