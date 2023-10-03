<script>
	import { createEventDispatcher } from 'svelte';
	export let title = 'Cancel';

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('Cancel', {
			status: 'canceled'
		});
	}
</script>

<button on:click={handleClick} class="btn btn_cancel">{title}</button>
