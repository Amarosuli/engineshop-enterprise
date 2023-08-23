<script>
	import { CommonSets } from '$lib/utils/CommonSets';

	export let title = 'link';
	export let color = 'base'; // base, success, danger, warning, info, light, dark
	export let size = 'compact'; // compact, full
	export let type = 'button'; // button, submit
	export let center = false;
	export let right = false;
	export let left = false;
	export let form = null;
	export let disabled = false;
	export let hidden = false;

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
</script>

<button
	{type}
	{form}
	{disabled}
	class:!hidden={hidden}
	class:mx-auto={center}
	class:ml-auto={right}
	class:mr-auto={left}
	class:w-fit={size === 'compact'}
	class:w-full={size === 'full'}
	class="{CommonSets.ColorSet[color].textColor} {CommonSets.ColorSet[color].bgColor} {CommonSets.ColorSet[color].hoverColor}"
	on:click>{title}<slot /></button>
