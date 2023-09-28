<script>
	import { getContext } from 'svelte';
	import { fly } from 'svelte/transition';
	const { isOpen } = getContext('switcher');

	export let size = '';
</script>

{#if $isOpen}
	<div id="dropdown_content" transition:fly={{ y: -5 }} class="absolute z-20 mt-2 p-3 bg-slate-50 shadow-md w-max">
		<slot />
	</div>
{/if}
