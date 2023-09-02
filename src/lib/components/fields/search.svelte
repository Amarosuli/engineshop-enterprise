<script>
	import { createEventDispatcher } from 'svelte';

	export let id = Math.random().toString();
	export let name = 'text';
	export let error = '';
	export let label = '';
	export let required = false;
	export let placeholder = 'Type Something..';
	export let autocomplete = 'off';
	export let value = '';

	let isNotEmpty;
	$: isNotEmpty;

	const onChange = (e) => {
		if (!e || !e.target) {
			return;
		}

		if (e.target.value) {
			isNotEmpty = '!border-sky-500';
		} else {
			isNotEmpty = '';
		}
	};

	const dispatch = createEventDispatcher();
	const onEnter = (e) => {
		if (!e || !e.target) {
			return;
		}

		if (e.keyCode === 13 || e.key === 'Enter') dispatch('Enter', { value: value });
	};
</script>

<div>
	<label for={id}>
		<span>{label}</span>
	</label>
	<div class="group marker:relative justify-center">
		<i class="ri-search-2-line ri-xl group:focus:text-sky-600 absolute ml-2 mt-1 text-sky-600" />
		<input type="text peer" class={isNotEmpty} on:change={onChange} {id} {name} {placeholder} {required} {autocomplete} bind:value on:keydown={onEnter} />
	</div>
	{#if error}
		<span>{error}</span>
	{/if}
</div>

<style>
	div {
		@apply flex w-full flex-col space-y-1;
	}
	div > span {
		@apply self-end text-sm text-red-600;
	}
	label {
		@apply inline-block text-sm font-semibold text-slate-600;
	}
	label > span {
		@apply self-start tracking-widest;
	}
	input {
		@apply h-10 border-b border-slate-200 py-2 pl-10 pr-4 text-slate-700 transition-colors ease-out hover:border-sky-200 hover:bg-slate-200 focus:border-sky-500 focus:bg-slate-50 focus:outline-none;
	}
</style>
