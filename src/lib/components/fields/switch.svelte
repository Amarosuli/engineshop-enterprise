<script>
	export let id = Math.random().toString();
	export let className = '';
	export let name = 'text';
	export let error = '';
	export let label = 'label.text';
	export let required = false;
	export let placeholder = 'type something..';
	export let autocomplete = 'off';
	export let value = '';
	export let hidden = false;
	export let disabled = false;
</script>

<div class="field-container">
	<label for={id} class="relative inline-flex cursor-pointer items-center">
		<input class="peer sr-only {className}" type="checkbox" {id} {name} {placeholder} {required} {autocomplete} bind:checked={value} on:change {disabled} />
		<div
			class:peer-checked:bg-slate-500={disabled}
			class="h-8 w-[3.7rem] rounded-full bg-slate-200
         after:absolute
         after:left-[3px]
         after:top-[2px]
         after:h-[1.6rem]
         after:w-[1.6rem]
         after:rounded-full
         after:bg-white
         after:transition-all
         after:content-['']
         peer
         peer-checked:bg-sky-500
         peer-checked:after:bg-sky-100
         peer-checked:after:translate-x-full
         " />
		<span class:hidden class="ml-3 inline-block text-sm font-semibold text-slate-600 self-start tracking-widest">{label}</span>
	</label>
	{#if error}
		<span class="error">{error}</span>
	{/if}
</div>

<style lang="scss">
	.field-container {
		@apply flex w-full flex-col space-y-1;
	}
	.error {
		@apply self-start text-xs italic text-red-600;
	}
</style>
