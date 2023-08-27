<script>
	import { createEventDispatcher } from 'svelte';

	export let title = 'Button';
	export let disabled = false;

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('Event', {
			status: 'event triggered',
			element: this
		});
	}
</script>

<button type="button" {disabled} class="btn btn_event" on:click={handleClick}>{title}<slot /></button>
