<script>
    export let form;
	let username = '';
	let password = '';
</script>

<div class="bg-base-100 mx-auto mt-20 max-w-md p-6">
	<h1 class="mb-2 text-center text-3xl font-bold">plated</h1>
	<p class="text-base-content/70 mb-6 text-center">
		Please log in to explore delicious recipes and manage your own collection.
	</p>

    {#if form?.error}
        <div class="alert alert-error mb-4">
            <span>{form.error}</span>
        </div>
    {/if}


	<form method="POST" class="space-y-4">
		<input class="input input-bordered w-full" name="username" bind:value={username} placeholder="Username"/>
		<input type="password" class="input input-bordered w-full" name="password" bind:value={password} placeholder="Password"/>
		<button class="btn btn-primary w-full" type="submit">Login</button>
	</form>
</div>
