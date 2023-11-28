<script>
	import { onMount } from 'svelte';
	let ListItem;
	let dynamicClasses = '';
	onMount(() => {
		switch (ListItem.childElementCount) {
			case 2:
				dynamicClasses = 'justify-between grid-cols-2';
				break;
			case 3:
				dynamicClasses = 'justify-around grid-cols-3';
				break;
			default:
				dynamicClasses = 'justify-start';
				break;
		}
	});
</script>

<div class="list_item {dynamicClasses}" bind:this={ListItem}>
	<slot />
</div>

<style lang="postcss">
	.list_item {
		@apply mb-2 grid h-14 max-h-max w-full items-center bg-slate-50 px-4 text-sm shadow-sm;
	}
</style>
