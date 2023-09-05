<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('Confirm', {
			status: 'confirmed'
		});
	}
</script>

<button on:click={handleClick} class="btn btn_confirm">Confirm</button>
