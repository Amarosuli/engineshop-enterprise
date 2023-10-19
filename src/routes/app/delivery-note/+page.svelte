<script>
	import { superForm, defaultValues } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	import TableInput from './TableInput.svelte';
	import SignField from './SignField.svelte';

	import { slide } from 'svelte/transition';
	import { invalidateAll } from '$app/navigation';
	import { File, Form, Button, Text, Date, Select } from '$lib/components';

	export let data;
	const { form, errors, enhance } = superForm(data.form, {
		applyAction: false,
		taintedMessage: null,
		onResult: async ({ result }) => {
			if (result.type === 'success') {
				stateOnSave = 'Saved !';
				invalidateAll();
			}
		}
	});

	let deliveryNoteNumber = '';
	function getDeliveryNoteNumber() {
		deliveryNoteNumber = 'xxxx';
	}

	let isHistoryShow = false;
	function toggleHistory() {
		isHistoryShow = !isHistoryShow;
	}

	let schema = [];

	// $: $form.data = JSON.stringify(schema);
	$: $form.data = schema;
</script>

<svelte:head>
	<title>Delivery Note</title>
</svelte:head>

<div class="absolute bottom-0 z-20 hidden w-1/4 p-4">
	<SuperDebug data={$form} />
</div>

<div class="absolute inset-0 flex">
	<div class="flex h-full w-full flex-col">
		<div class="flex h-20 items-center justify-between p-7">
			<p class="text-xl font-extrabold text-slate-700">Create Delivery Note</p>
			<!-- <div>actions, all button, etc</div> -->
			<Button.Event title="{isHistoryShow ? 'Hide' : 'Show'} History" on:Event={toggleHistory} />
		</div>
		<div class="flex h-full flex-col overflow-hidden xl:flex-row">
			<div class="flex h-full w-full items-start overflow-y-auto bg-slate-200 p-4 xl:w-1/2">
				<!-- left, all basic input -->
				<Form.Root let:id id="create" method="POST" action="?/create" {enhance}>
					<Form.Item>
						<SignField />
						<Text id="number" name="number" label="Delivery Note Number" value={deliveryNoteNumber} disabled />
						<div class="flex w-full flex-col space-y-2 xl:flex-row xl:space-x-4">
							<div class="w-full space-y-2">
								<Select id="template_id" name="template_id" label="Template" disabled />
								<Date id="shipment_date" name="shipment_date" label="Shipment Date" bind:value={$form.shipment_date} />
								<Text id="shipperName" name="shipperName" label="Shipper Name" bind:value={$form.shipper_name} />
								<Text id="shipperId" name="shipperId" label="Shipper ID" bind:value={$form.shipper_id} />
								<Text id="shipperUnit" name="shipperUnit" label="Shipper Unit" bind:value={$form.shipper_unit} />
								<File accept="*" label="shipperSign" />
							</div>
							<div class="w-full space-y-2">
								<Text id="recipientName" name="recipientName" label="Recipient Name" bind:value={$form.recipient_name} />
								<Text id="recipientId" name="recipientId" label="Recipient ID" bind:value={$form.recipient_id} />
								<Text id="recipientUnit" name="recipientUnit" label="Recipient Unit" bind:value={$form.recipient_unit} />
								<File accept="*" label="recipientSign" />
							</div>
						</div>
					</Form.Item>
					<Form.Submit title="Create" formId={id} />
				</Form.Root>
			</div>
			<div class="w-full bg-zinc-200 px-4 py-2">
				<TableInput bind:schema />
			</div>
		</div>
	</div>
	{#if isHistoryShow}
		<div transition:slide={{ axis: 'x' }} class="h-full w-1/3 bg-amber-300">
			<div class="h-20 p-4 pr-8">
				<p class="text-right text-xl font-extrabold text-slate-700">Recent Data</p>
			</div>
		</div>
	{/if}
</div>
