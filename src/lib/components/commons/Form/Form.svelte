<script>
	export let id = ''; /** @param {string} id */
	export let action = ''; /** @param {string} action*/
	export let method = 'GET'; /** @param {string} method*/
	export let enctype = 'application/x-www-form-urlencoded'; /** @param {string} enctype*/
	export let enhance;
</script>

<div class="form-content">
	<form class="form-body" id={`${id}Form`} {action} {method} {enctype} on:submit use:enhance>
		<slot />
	</form>
</div>
