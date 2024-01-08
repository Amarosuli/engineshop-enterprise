<script>
	import { X } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('Close', {
			status: 'closed'
		});
	}
</script>

<button on:click={handleClick} class="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-300 hover:text-white">
	<X size="15" />
</button>
