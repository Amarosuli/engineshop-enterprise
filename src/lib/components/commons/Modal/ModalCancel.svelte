<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('Cancel', {
			status: 'canceled'
		});
	}
</script>

<button on:click={handleClick} class="btn btn_cancel">Cancel</button>
