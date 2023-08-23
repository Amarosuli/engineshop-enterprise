<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('Close', {
			status: 'closed'
		});
	}
</script>

<button on:click={handleClick} class="hover:bg-slate-300 w-10 h-10 flex justify-center items-center rounded-xl text-slate-600 hover:text-white"><i class="ri-close-fill ri-xl text-inherit" /></button>
