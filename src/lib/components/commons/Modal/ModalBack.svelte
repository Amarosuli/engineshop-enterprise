<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('Back', {
			status: 'back'
		});
	}
</script>

<button on:click={handleClick} class="btn btn_back">Back</button>
