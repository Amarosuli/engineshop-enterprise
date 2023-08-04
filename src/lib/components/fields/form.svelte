<script>
	export let id = ''; /** @param {string} id */
	export let title = ''; /** @param {string} title*/
	export let action = ''; /** @param {string} action*/
	export let method = 'GET'; /** @param {string} method*/
	export let enctype = 'application/x-www-form-urlencoded'; /** @param {string} enctype*/
	export let enhance;
	export let errors = null;
</script>

<div class="form-container">
	<div class="form-header">
		<h1 class="form-title">{title} Form</h1>
	</div>
	<div class="form-content">
		<form class="form-body" id={`${id}Form`} {action} {method} {enctype} on:submit use:enhance>
			<slot />
			{#if $errors?.pocketbaseErrors}
				<span class="form-error">{$errors?.pocketbaseErrors}</span>
			{/if}
		</form>
	</div>
</div>
