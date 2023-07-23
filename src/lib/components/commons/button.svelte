<script>
	import { CommonSets } from '$lib/utils/CommonSets';

	// export let href = '/';

	export let title = 'link';
	export let color = 'base';
	export let size = 'compact'; // compact, full
	export let type = 'button'; // button, submit
	export let center;
	export let right;
	export let left;

	/** checking @color is valid name ref to @ColorName **/
	if (color) {
		let isValid = CommonSets.ColorName.find((name) => color == name);
		if (!isValid || isValid === null || isValid === undefined || isValid === false) {
			color = 'base';
		}
	}
</script>

<button class:mx-auto={center} class:ml-auto={right} class:mr-auto={left} {type} class:w-fit={size === 'compact'} class:w-full={size === 'full'} class="{CommonSets.ColorSet[color].textColor} {CommonSets.ColorSet[color].bgColor} {CommonSets.ColorSet[color].hoverColor}" on:click>{title}</button>

<style>
	button {
		@apply px-4 py-2 text-sm;
	}
</style>
