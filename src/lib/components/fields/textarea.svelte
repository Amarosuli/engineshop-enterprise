<script>
	export let id = Math.random().toString();
	export let name = 'text';
	export let error = '';
	export let label = 'label.text';
	export let required = false;
	export let placeholder = 'type something..';
	export let autocomplete = 'off';
	export let value = '';
	export let hidden = false;

	let isNotEmpty;
	$: isNotEmpty;
	$: value;

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
</script>

<div>
	<label for={id} class:hidden>
		<span class:hidden>{label}</span>
	</label>
	<textarea class={isNotEmpty} class:hidden on:change={onChange} {id} {name} {placeholder} {required} {autocomplete} bind:value />
	{#if error}
		<span>{error}</span>
	{/if}
</div>

<style>
	div {
		@apply flex w-full flex-col space-y-1;
	}
	div > span {
		@apply self-end text-xs italic text-red-600;
	}
	label {
		@apply inline-block text-sm font-semibold text-slate-600;
	}
	label > span {
		@apply self-start tracking-widest;
	}
	textarea {
		@apply h-16 border-b border-slate-200 px-4 py-2 text-slate-700 transition-colors ease-out hover:border-sky-200 hover:bg-slate-200 focus:border-sky-500 focus:bg-slate-50 focus:outline-none;
	}
</style>
