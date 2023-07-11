<script>
	import { ColorSet, ColorName } from '$lib/utils/theme';

	// export let href = '/';
	export let title = 'link';
	export let color = 'base';

	/** checking @color is valid name ref to @ColorName **/
	if (color) {
		let isValid = ColorName.find((name) => color == name);
		if (!isValid || isValid === null || isValid === undefined || isValid === false) {
			color = 'base';
		}
	}
</script>

<button class="{ColorSet[color].textColor} {ColorSet[color].bgColor} {ColorSet[color].hoverColor}">{title}</button>

<style>
	button {
		@apply px-3 py-2 text-sm;
	}
</style>
