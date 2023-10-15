<script>
	import { superForm, defaultValues } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	import TableInput from './TableInput.svelte';

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
</script>

<svelte:head>
	<title>Delivery Note</title>
</svelte:head>

<div class="absolute inset-0 flex">
	<div class="w-full h-full flex flex-col">
		<div class="h-20 p-4 flex justify-between items-center">
			<p class="text-xl text-slate-700 font-extrabold">Create Delivery Note</p>
			<!-- <div>actions, all button, etc</div> -->
			<Button.Event title="{isHistoryShow ? 'Hide' : 'Show'} History" on:Event={toggleHistory} />
		</div>
      <div class="h-full flex">
         <div class="w-1/2 h-full flex bg-slate-400 items-start">
            <!-- left, all basic input -->
         <Form.Root let:id id="create" method="POST" action="?/create" {enhance}>
                  <Form.Item>
                     <Text id="number" name="number" label="Delivery Note Number" value={deliveryNoteNumber} disabled />
                     <div class="w-full flex flex-row row-spa space-x-4">
                        <div class="w-full space-y-2">
                           <Date id="shipment_date" name="shipment_date" label="Shipment Date   " />
                           <Text id="shipperName" name="shipperName" label="Shipper Name" />
                           <Text id="shipperId" name="shipperId" label="Shipper ID" />
                           <Text id="shipperUnit" name="shipperUnit" label="Shipper Unit" />
                           <File accept="*" label="shipperSign" />
                        </div>
                        <div class="w-full space-y-2">
                           <Select id="template_id" name="template_id" label="Template" disabled />
                           <Text id="recipientName" name="recipientName" label="Recipient Name" />
                           <Text id="recipientId" name="recipientId" label="Recipient ID" />
                           <Text id="recipientUnit" name="recipientUnit" label="Recipient Unit" />
                           <File accept="*" label="recipientSign" />
                        </div>
                     </div>
                  </Form.Item>
                  <Form.Submit title="Create" formId={id} />
               </Form.Root>
               </div>
         <div class="w-full py-2 px-4 bg-zinc-300">
            <TableInput />
         </div>
      </div>
	</div>
	{#if isHistoryShow}
		<div transition:slide={{ axis: 'x' }} class="w-1/3 bg-amber-300 h-full">
			<div class="h-20 p-4 pr-8">
				<p class="text-xl text-slate-700 font-extrabold text-right">Recent Data</p>
			</div>
		</div>
	{/if}
</div>
