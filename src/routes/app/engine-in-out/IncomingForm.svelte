<script>
	import classes from 'svelte-transition-classes';
	import { fadeIn, fadeOut } from '$lib/utils/TransitionSets';
	import { Text, Date, Switch, Btn } from '$lib/components';

	export let selectedData = {};
	export let inputCheck = '';
	export let form;
</script>

<div in:classes={fadeIn} out:classes={fadeOut} class="w-full xl:w-1/2">
	<form action="?/incoming" method="POST" class="flex flex-col gap-2">
		<Text id="id" name="id" hidden bind:value={selectedData.id} disabled />
		<Text id="esn" name="esn" label="ESN" bind:value={inputCheck} disabled />
		<Text id="status" name="status" label="Status" value="INCOMING" hidden />
		<Date id="date_in" name="date_in" label="Incoming Date" bind:value={$form.date_in} />
		<Btn type="submit" title="Register Engine" color="success" right />
	</form>
</div>
