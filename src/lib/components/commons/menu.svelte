<script>
	import { fly } from 'svelte/transition';
	import { CommonSets } from '$lib/utils/CommonSets';

	export let title = 'link';
	export let color = 'base'; // base, success, danger, warning, info, light, dark
	export let size = 'compact'; // compact, full
	export let center = false;
	export let right = false;
	export let left = false;

	/**
	 * Checking @color is valid name ref to @ColorName
	 * @argument {string} color
	 * */
	if (color) {
		let isValid = CommonSets.ColorName.find((name) => color == name);
		if (!isValid || isValid === null || isValid === undefined || isValid === false) {
			color = 'base';
		}
	}

	let isOpen = false;
</script>

<!-- <div class="flex justify-center items-center px-4 py-3 {CommonSets.ColorSet[color].textColor} {CommonSets.ColorSet[color].bgColor} {CommonSets.ColorSet[color].hoverColor}"> -->
<button
	class:mx-auto={center}
	class:ml-auto={right}
	class:mr-auto={left}
	class:w-fit={size === 'compact'}
	class:w-full={size === 'full'}
	class="relative flex justify-center items-center px-4 py-3 {CommonSets.ColorSet[color].textColor} {CommonSets.ColorSet[color].bgColor} {CommonSets.ColorSet[color].hoverColor}"
	on:click|self|stopPropagation={() => (isOpen = !isOpen)}
	>{title}

	{#if isOpen}
		<div class="absolute z-50 flex flex-col top-16 right-0 p-5 rounded-md min-w-[100px] h-max bg-white text-slate-700 shadow-lg space-y-3" transition:fly={{ y: -5 }}>
			<slot />
		</div>
	{/if}
</button>
<!-- </div> -->
