<script>
	import { fly } from 'svelte/transition';
	export let title = 'Menu Title';

	let isOpen = false;

	function as(e) {
		console.log(e.target);
	}
</script>

<div id="x" class="relative flex flex-col gap-4">
	<button class="bg-slate-300 p-2" on:mouseenter={as} on:click={() => (isOpen = !isOpen)}>{title}</button>
	{#if isOpen}
		<div class="absolute flex flex-col top-12 right-0 min-w-[100px] h-max bg-slate-300 shadow-lg" transition:fly={{ y: -5 }}>
			<a class="px-3 py-2 hover:bg-slate-200" href="/">.xlsx</a>
			<a class="px-3 py-2 hover:bg-slate-200" href="/">.pdf</a>
		</div>
	{/if}
</div>
