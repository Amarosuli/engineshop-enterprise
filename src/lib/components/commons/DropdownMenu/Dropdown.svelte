<script>
	import { setContext, getContext } from 'svelte';
	import { writable } from 'svelte/store';

	let exclude;

	function Switch() {
		const store = writable(false);
		const { set, subscribe, update } = store;

		return {
			subscribe,
			set,
			switch: () => {
				update((v) => (v = !v));
			}
		};
	}

	setContext('switcher', {
		isOpen: Switch()
	});

	const { isOpen } = getContext('switcher');

	function handleClick(e) {
		console.log(e.target);
		if (e.target.parentNode !== exclude) isOpen.set(false);
	}
</script>

<svelte:body on:click={handleClick} />

<div class="relative w-fit h-fit" id={Math.random()} bind:this={exclude}>
	<slot />
</div>
