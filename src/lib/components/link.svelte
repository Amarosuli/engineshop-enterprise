<script>
	import { CommonSets } from '$lib/utils/CommonSets';

	export let href = '/';
	export let title = '';
	export let color = 'base';
	export let size = 'w-fit';

	/** checking @color is valid name ref to @ColorName **/
	if (color) {
		let isValid = CommonSets.ColorName.find((name) => color == name);
		if (!isValid || isValid === null || isValid === undefined || isValid === false) {
			color = 'base';
		}
	}
</script>

<a class="{CommonSets.ColorSet[color].textColor} {CommonSets.ColorSet[color].bgColor} {CommonSets.ColorSet[color].hoverColor} {size}" {href}><slot /> {title}</a>

<style style="postcss">
	a {
		@apply flex items-center justify-between gap-2 rounded-lg px-4 py-2 text-center text-xs font-semibold tracking-wide  transition-colors ease-out;
	}
</style>
