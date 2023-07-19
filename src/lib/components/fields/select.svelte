<script>
	export let id = Math.random().toString();
	export let name = 'select';
	export let error = '';
	export let label = 'label.select';
	export let required = true;
	export let autocomplete = 'off';
	export let options = []; // [ {value, title} ]
	export let value = '';

	let isNotEmpty;
	$: isNotEmpty;

	const onChange = (e) => {
		console.log(e.target.value);
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
	<select class={isNotEmpty} {id} {name} {required} {autocomplete} on:change={onChange} bind:value>
		<option value="">--</option>
		<!-- rename the options key incase conflict with the value props -->
		{#each options as { value: v, title: t }, index}
			{#if value && value === v}
				<option selected value={v}>{t}</option>
			{:else}
				<option value={v}>{t}</option>
			{/if}
		{/each}
	</select>
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
	select {
		@apply h-10 border-b border-slate-200 px-4 py-2 text-slate-700 transition-colors ease-out hover:border-sky-200 hover:bg-slate-200 focus:border-sky-500 focus:bg-slate-50 focus:outline-none;
	}
</style>
