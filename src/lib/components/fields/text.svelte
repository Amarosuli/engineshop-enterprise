<script>
	export const id = Math.random().toString();
	export const name = 'text';
	export const error = '';
	export const label = 'label.text';
	export const required = false;
	export const placeholder = 'type something..';
	export const autocomplete = 'off';

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
</script>

<div>
	<label for={id}>
		<span>{label}</span>
	</label>
	<input type="text" class={isNotEmpty} on:change={onChange} {id} {name} {placeholder} {required} {autocomplete} />
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
		@apply h-10 border-b border-slate-200 px-4 py-2 text-slate-700 transition-colors ease-out hover:border-sky-200 hover:bg-slate-200 focus:border-sky-500 focus:bg-slate-50 focus:outline-none;
	}
</style>
