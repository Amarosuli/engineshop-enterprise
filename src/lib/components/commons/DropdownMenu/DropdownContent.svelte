<script>
	import { getContext } from 'svelte';
	import { fly } from 'svelte/transition';
	const { isOpen } = getContext('switcher');

	export let size = '';

	let contentEl;
	function checkOffScreen(rect) {
		// let rect = document.querySelector('#dropdown_content');
		// console.log(rect);
		// var rect = e.target.getBoundingClientRect();
		if (rect === undefined) return;
		let result = rect.x + rect.width < 0 || rect.y + rect.height < 0 || rect.x > window.innerWidth || rect.y > window.innerHeight;
		return result;
	}
	$: if ($isOpen) checkOffScreen(contentEl);
</script>

{#if $isOpen}
	<div id="dropdown_content" transition:fly={{ y: -5 }} bind:contentRect={contentEl} class="absolute rounded-md flex flex-col right-0 z-20 mt-2 p-1 bg-white shadow-md {size}">
		<slot />
	</div>
{/if}
