<script>
	import { slide } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';

	import Trigger from './CollapsibleTrigger.svelte';

	let show = false;
	function handleTrigger(e) {
		show = e.detail.status;
	}
</script>

<div class="collapsible_root">
	<Trigger on:Trigger={handleTrigger}>
		<slot name="trigger">
			<span>Trigger</span>
		</slot>
	</Trigger>

	{#if show}
		<div class="collapsible_content" transition:slide={{ duration: 300, axis: 'y', easing: quintInOut }}>
			<slot />
		</div>
	{/if}
</div>

<style lang="postcss">
	.collapsible_root {
		@apply mb-2 h-fit w-full;
	}
	.collapsible_content {
		@apply h-max w-full bg-inherit p-4 text-sm;
	}
</style>
