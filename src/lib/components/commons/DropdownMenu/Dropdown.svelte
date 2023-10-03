<script>
	import { setContext, getContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { CommonHelpers } from '$lib/utils/CommonHelpers';

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
</script>

<div use:CommonHelpers.clickOutside on:click_outside={() => isOpen.set(false)} class="relative w-fit h-fit" id={Math.random()} bind:this={exclude}>
	<slot />
</div>
