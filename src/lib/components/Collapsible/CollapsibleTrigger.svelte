<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let onState = false;
	function handleClick() {
		onState = !onState;
		dispatch('Trigger', {
			status: onState
		});
	}
</script>

<button class="collapsible_trigger" on:click={handleClick}>
	<slot />
	{#if onState}
		<span><i class="ri-arrow-up-s-line ri-lg" /></span>
	{:else}
		<span><i class="ri-arrow-down-s-line ri-lg" /></span>
	{/if}
</button>

<style lang="postcss">
	.collapsible_trigger {
		@apply flex h-14 w-full select-none items-center justify-between border-none bg-inherit bg-slate-200 px-5 py-2 align-middle text-sm;
	}
</style>
