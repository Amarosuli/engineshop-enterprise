<script>
	import { CommonSets } from '$lib/utils/CommonSets';

	export let href = '/';
	export let title = 'link';
	export let color = 'base';

	/** checking @color is valid name ref to @ColorName **/
	if (color) {
		let isValid = CommonSets.ColorName.find((name) => color == name);
		if (!isValid || isValid === null || isValid === undefined || isValid === false) {
			color = 'base';
		}
	}
</script>

<a class="{CommonSets.ColorSet[color].textColor} {CommonSets.ColorSet[color].bgColor} {CommonSets.ColorSet[color].hoverColor}" {href}>{title}</a>

<style>
	a {
		@apply px-3 py-2 text-sm;
	}
</style>
