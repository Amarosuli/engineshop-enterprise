<script>
	export let error = null;
</script>

{#if error}
	<span class="form-error">{error}</span>
{/if}
