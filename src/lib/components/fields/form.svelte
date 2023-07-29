<script>
	export let id = '';
	export let title = '';
	export let action = '';
	export let method = 'GET';
	export let enctype = 'application/x-www-form-urlencoded';
	export let enhance;
	export let errors = null;
</script>

<div class="modal-container">
	<div class="modal-header">
		<h1 class="modal-title">{title} Form</h1>
	</div>
	<div class="modal-content">
		<form id={`${id}Form`} {action} {method} class="space-y-3 mx-2" {enctype} use:enhance>
			<slot />
			{#if $errors?.pocketbaseErrors}
				<span class="italic text-xs py-2 text-center bg-yellow-200">{$errors?.pocketbaseErrors}</span>
			{/if}
		</form>
	</div>
</div>
