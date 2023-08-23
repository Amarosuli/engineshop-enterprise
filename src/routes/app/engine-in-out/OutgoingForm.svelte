<script>
	import classes from 'svelte-transition-classes';
	import { fadeIn, fadeOut } from '$lib/utils/TransitionSets';
	import { Text, Date, Switch, Btn } from '$lib/components';

	export let selectedData = {};
	export let inputCheck = '';
</script>

<div in:classes={fadeIn} out:classes={fadeOut} class="mt-6 border-dashed border-t border-t-orange-400">
	<form action="?/outgoing" method="POST" class="space-y-3 flex flex-col">
		<Text id="id" name="id" bind:value={selectedData.id} hidden />
		<Text id="esn" name="esn" label="ESN" bind:value={inputCheck} disabled />
		<Text id="engine_id" name="engine_id" label="Engine Id" bind:value={selectedData.engine_id} hidden />
		<Date id="date_in" name="date_in" label="Incoming Date" bind:value={selectedData.date_in} hidden />
		<Date id="date_out" name="date_out" label="Outgoing Date" bind:value={selectedData.date_out} />
		<!-- isInShop should default to false in Outgoing form -->
		<!-- <Switch id="isInShop" name="isInShop" label="Is Engine In Shop" value={false}  /> -->
		<Btn type="submit" title="Release Engine" color="danger" right />
	</form>
</div>
