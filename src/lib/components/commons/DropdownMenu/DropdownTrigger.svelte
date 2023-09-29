<script>
	import { CommonSets } from '$lib/utils/CommonSets';
	import { getContext } from 'svelte';

	export let color = 'base';

	const { isOpen } = getContext('switcher');

	/** checking @color is valid name ref to @ColorName **/
	if (color) {
		let isValid = CommonSets.ColorName.find((name) => color == name);
		if (!isValid || isValid === null || isValid === undefined || isValid === false) {
			color = 'base';
		}
	}
</script>

<button
	id="dropdown_trigger"
	on:click|stopPropagation={isOpen.switch}
	class="btn transition-colors ease-out {CommonSets.ColorSet[color].textColor} {CommonSets.ColorSet[color].bgColor} {CommonSets.ColorSet[color].hoverColor}">
	<slot {isOpen} />
</button>

<!-- <button id="dropdown_trigger" on:click|stopPropagation={isOpen.switch} class="btn btn_ghost transition-colors ease-out">
	<slot {isOpen} />
</button> -->
