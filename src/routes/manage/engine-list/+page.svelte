<script>
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { _row, modal } from '$lib/utils/store';
	import { Modal, ModalWithDialog, Search, Menu, Select, Table, Text, Switch, TextArea } from '$lib/components';

	export let data;

	/**
	 * Superform: applyAction set to false so we can handle onResult.
	 * onResult void success, reload page using window.location. goto method not work
	 */
	const { form, errors, enhance } = superForm(data.form, {
		applyAction: false,
		onResult: async ({ result }) => {
			if (result.type === 'success') {
				window.location = '/manage/engine-list';
			}
		}
	});

	/**
	 * destructure of data from page.server.js
	 * make using of specific data more simpler for Table Components props and other needs
	 */
	const { engineList, engineModels, customers } = data;

	const modelOptions = engineModels.map(({ id, name }) => ({ value: id, title: name }));
	const customerOptions = customers.map(({ id, name }) => ({ value: id, title: name }));

	/**
	 * destructure of modal costum store
	 * make using method more simpler
	 */
	const { isConfirm, isDelete, isUpdate, isCreate, isDetail } = modal;

	/**
	 * define the table column
	 * data from page.server.js need to shape as fit as the defined columns
	 */
	const dataCol = [
		{
			header: 'ESN',
			accessor: 'esn'
		},
		{
			header: 'Config',
			accessor: 'config'
		},
		{
			header: 'Model',
			accessor: 'model'
		},
		{
			header: 'Customer',
			accessor: 'customer'
		},
		{
			header: 'Engine InShop',
			accessor: 'isAvailable'
		},
		{
			header: 'Preserve',
			accessor: 'excludePreservation'
		},
		{
			header: 'Notes',
			accessor: 'notes'
		}
	];

	let selectedRows = [];
	let search = '';
	let exportJSON;

	/**
	 * this is for reseting the selected table rows
	 * manually get the table checked box input
	 * then trigger click event to unchecked all checked input
	 */
	function handleReset() {
		let elements = document.querySelectorAll('[data-isChecked]');
		elements.forEach((el) => {
			// el.getAttribute('dataset-isChecked') === 'true' -- old
			if (el.dataset.ischecked === 'true') {
				el.click();
			}
		});
	}

	// check if data in _row store exist and id of modal update is exist (modal update open)
	$: $isUpdate ? setUpdate(1) : '';

	// reset _row store only when modal create open (so we will get the data for page.server)
	$: $isCreate ? setUpdate(0) : '';

	/**
	 * this is for handling the stored data where the superform rely on it
	 * for case the update form, form data (superform) need to override with
	 * the rows data store. which is used for display the detail form.
	 * but for create form , the form data need to reset as an empty.
	 */
	function setUpdate(isTrue) {
		if (isTrue) {
			$form.esn = $_row?.original?.esn;
			$form.config = $_row?.original?.config;
			$form.model_id = $_row?.original?.model_id;
			$form.customer_id = $_row?.original?.customer_id;
			$form.isAvailable = $_row?.original?.isAvailable;
			$form.excludePreservation = $_row?.original?.excludePreservation;
			$form.notes = $_row?.original?.notes;
		} else {
			$form.esn = '';
			$form.config = '';
			$form.model_id = '';
			$form.customer_id = '';
			// $form.isAvailable = ''; already have a default value
			// $form.excludePreservation = ''; already have a default value
			$form.notes = '';
		}
	}

	/**
	 * @TODO
	 * this is for handling export
	 * will have two format file on export (xlsx and pdf)
	 * both will use library that capable to use template
	 * for pdf file will be use the pdfme library
	 * for excel file will be use the js-excel-template
	 */
	function handleExport() {
		console.log(exportJSON);

		// TODO: export to excel or pdf
	}
</script>

<svelte:head>
	<title>Manage - Engine List</title>
</svelte:head>

{#if $isDetail}
	<Modal id="detail" position="right">
		<div class="modal-container">
			<div class="modal-header">
				<h1 class="modal-title">Detail Form</h1>
				<button class="px-3 py-2 bg-slate-600" on:click={() => modal.show('update')}>Update</button>
			</div>
			<div class="modal-content">
				<p class="font-semibold flex justify-between py-3 px-3 border-b">Engine Serial Number: <span class="font-bold">{$_row?.original?.esn}</span></p>
				<p class="font-semibold flex justify-between py-3 px-3 border-b">Configuration: <span class="font-bold">{$_row?.original?.config}</span></p>
				<p class="font-semibold flex justify-between py-3 px-3 border-b">Model Name: <span class="font-bold">{$_row?.original?.model}</span></p>
				<p class="font-semibold flex justify-between py-3 px-3 border-b">Customer Name: <span class="font-bold">{$_row?.original?.customer}</span></p>
				<p class="font-semibold flex justify-between py-3 px-3 border-b">Engine InShop: <span class="font-bold">{$_row?.original?.isAvailable}</span></p>
				<p class="font-semibold flex justify-between py-3 px-3 border-b">Preservation: <span class="font-bold">{$_row?.original?.excludePreservation}</span></p>
				<p class="font-semibold flex justify-between py-3 px-3 border-b">Notes: <span class="font-bold">{$_row?.original?.notes}</span></p>
			</div>
		</div>
	</Modal>
{/if}

{#if $isUpdate}
	<Modal id="update" position="right">
		<div class="modal-container">
			<div class="modal-header">
				<h1 class="modal-title">Update Form</h1>
			</div>
			<div class="modal-content">
				<form action="?/update" method="POST" class="space-y-3 mx-2" use:enhance>
					<Text id="id" name="id" bind:value={$_row.original.id} hidden />
					<Text id="esn" name="esn" label="Engine Serial Number" bind:value={$form.esn} error={$errors.esn} />
					<Text id="config" name="config" label="Configuration" bind:value={$form.config} error={$errors.config} />
					<Select id="model_id" name="model_id" label="Engine Model" bind:value={$form.model_id} options={modelOptions} />
					<Select id="customer_id" name="customer_id" label="Customer" bind:value={$form.customer_id} options={customerOptions} />
					<Switch id="isAvailable" name="isAvailable" label="Engine InShop" bind:value={$form.isAvailable} />
					<Switch id="excludePreservation" name="excludePreservation" label="Preservation" bind:value={$form.excludePreservation} />
					<TextArea id="notes" name="notes" label="Notes" bind:value={$form.notes} error={$errors.notes} />

					<button type="submit" class="flex mx-auto px-3 py-2 bg-orange-400">Update</button>
					{#if $errors.pocketbaseErrors}
						<span class="italic text-xs py-2 text-center bg-yellow-200">{$errors.pocketbaseErrors}</span>
					{/if}
				</form>
			</div>
		</div>
	</Modal>
{/if}

{#if $isCreate}
	<Modal id="create" position="right">
		<SuperDebug data={$form} />
		<div class="modal-container">
			<div class="modal-header">
				<h1 class="modal-title">Create Form</h1>
			</div>
			<div class="modal-content">
				<form action="?/create" method="POST" class="space-y-3 mx-2" use:enhance>
					<Text id="esn" name="esn" label="Engine Serial Number" bind:value={$form.esn} error={$errors.esn} />
					<Text id="config" name="config" label="Configuration" bind:value={$form.config} error={$errors.config} />
					<Select id="model_id" name="model_id" label="Engine Model" bind:value={$form.model_id} options={modelOptions} />
					<Select id="customer_id" name="customer_id" label="Customer" bind:value={$form.customer_id} options={customerOptions} />
					<Switch id="isAvailable" name="isAvailable" label="Engine InShop" bind:value={$form.isAvailable} />
					<Switch id="excludePreservation" name="excludePreservation" label="Preservation" bind:value={$form.excludePreservation} />
					<TextArea id="notes" name="notes" label="Notes" bind:value={$form.notes} error={$errors.notes} />
					<button type="submit" class="flex mx-auto px-3 py-2 bg-orange-400">Create</button>
					{#if $errors.pocketbaseErrors}
						<span class="italic text-xs py-2 text-center bg-yellow-200">{$errors.pocketbaseErrors}</span>
					{/if}
				</form>
			</div>
		</div>
	</Modal>
{/if}

{#if $isDelete}
	<!-- <Modal id="delete" position="mid">Content</Modal> -->
	<div class="absolute flex right-0 bottom-10 justify-center items-center mx-auto z-20 h-max bg-orange-200 shadow w-max py-3 pl-6 pr-3 space-x-3">
		<span>Delete {selectedRows.length} selected data?</span>
		<button class="px-4 py-1 bg-red-400 text-xs" on:click={() => modal.show('confirm')}>Yes</button>
		<button class="px-4 py-1 bg-green-200 text-xs" on:click={handleReset}>Reset</button>
	</div>
{/if}

{#if $isConfirm}
	<ModalWithDialog id="confirm">
		<div class="modal-container">
			<div class="modal-header">
				<h1 class="modal-title">Are you sure ?</h1>
			</div>
			<div class="w-full pt-3">
				{#each selectedRows as { original }, index}
					<div class="flex flex-row items-center justify-between py-3 px-3 border-y text-xs font-semibold text-red-500">
						<span>{index + 1}</span>
						<span>{original.id}</span>
						<span>{original.name}</span>
						<span>{original.description}</span>
					</div>
				{/each}
			</div>
			<div>
				<form action="?/delete" method="POST">
					{#each selectedRows as { original }, index}
						<Text id={`id_${index}`} name={`name_${index}`} value={original.id} hidden />
					{/each}
					<button type="submit" class="flex mx-auto px-3 py-2 bg-orange-400">Delete</button>
				</form>
			</div>
			<div class="modal-content" />
		</div>
	</ModalWithDialog>
{/if}

<div class="absolute inset-0 flex">
	<div class="basis-1/4 hidden md:block">
		<div class="bg-slate-200 m-4 px-4 pt-2 pb-6 h-fit shadow-lg">
			<h1 class="text-xl text-slate-700 font-extrabold">Total Customer</h1>
			<p class="text-base font-semibold">15 engineList</p>
			<p class="text-slate-600">Engine Models are categorize by it's varian.</p>
		</div>
	</div>
	<div class="basis-full flex flex-col flex-nowrap">
		<div class="h-max pt-4 pb-12 px-6 gap-4 bg-slate-200 flex-nowrap flex justify-between overflow-x-auto">
			<div class="w-max min-w-lg">
				<span class="text-xl font-extrabold tracking-wide text-slate-600">Engine List</span>
				<Search bind:value={search} />
			</div>
			<div class="flex flex-wrap gap-4 justify-between items-center">
				<div class="lg:flex gap-3">
					<button class="p-2 h-max bg-slate-400" on:click={() => modal.show('create')}>Create</button>
					<button class="p-2 h-max bg-slate-400" on:click={() => handleExport()}>Export</button>
					<!-- <Menu title="Export" /> -->
				</div>
			</div>
		</div>
		<div class="relative overflow-y-auto">
			<!-- <Table dataTable={engineFamily} {dataCol} {search} bind:selectedRows /> -->
			<svelte:component this={Table} dataTable={engineList} {dataCol} {search} bind:selectedRows bind:exportJSON />
		</div>
	</div>
</div>
