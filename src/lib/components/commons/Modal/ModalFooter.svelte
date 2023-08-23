<script>
	import { Btn } from '$lib/components';
	import { modal$ } from '$lib/utils/Stores';

	export let id;
</script>

<div class="flex h-16 xl:h-20 gap-3 px-6 justify-end items-center py-3 border-t">
	<slot />
	<Btn type="button" title="Cancel" color="info" on:click={() => modal$.hide(id)} />
	{#if id === 'create'}
		<Btn type="submit" title="Create" color="base" form={`${id}Form`} />
	{/if}
	{#if id === 'update'}
		<Btn type="submit" title="Update" color="warning" form={`${id}Form`} />
	{/if}
</div>
