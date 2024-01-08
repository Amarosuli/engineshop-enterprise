<script>
	import { fade } from 'svelte/transition';
	export let id;
	export let name;
	export let value = '';
	export let data;

	let isEditing = false;
	let inputElement;

	$: if (isEditing) {
		inputElement?.focus();
	}

	$: $data[id][name] = value;

	function handleKeyDown(event) {
		if (event.key === 'Escape' || event.keyCode === 27) isEditing = false;
	}
</script>

{#if !isEditing}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<span in:fade on:click={() => (isEditing = true)}>{value}</span>
{:else}
	<div>
		<input
			in:fade
			type="text"
			class="focus:outline-none; flex h-10 w-full flex-col space-y-1 border-b border-slate-200 px-4 py-2 text-slate-700 transition-colors ease-out hover:border-sky-200 hover:bg-slate-200 focus:border-sky-500 focus:bg-slate-50"
			bind:this={inputElement}
			bind:value
			on:blur={() => (isEditing = false)} />
	</div>
{/if}

<svelte:document on:keydown={handleKeyDown} />

<style lang="postcss">
	span {
		@apply flex h-full w-full items-center justify-start text-xs italic text-red-600;
	}

	/* .editable_cell {
		@apply flex h-10 w-full flex-col space-y-1 border-b border-slate-200 px-4 py-2 text-slate-700 transition-colors ease-out hover:border-sky-200 hover:bg-slate-200 focus:border-sky-500 focus:bg-slate-50 focus:outline-none;
	} */
</style>
