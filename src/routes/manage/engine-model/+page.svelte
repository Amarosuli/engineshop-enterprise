<script>
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	import { _row, modal$ } from '$lib/utils/Stores';
	import { Modal, Search, Form, Btn, Select, Table, Text } from '$lib/components';

	export let data;

	/**
	 * Superform: applyAction set to false so we can handle onResult.
	 * onResult void success, reload page using window.location. goto method not work
	 */
	const { form, errors, enhance } = superForm(data.form, {
		applyAction: false,
		onResult: async ({ result }) => {
			if (result.type === 'success') {
				window.location = '/manage/engine-model';
			}
		},
		onError: async (a) => {
			console.log(a);
		}
	});

	/**
	 * destructure of data from page.server.js
	 * make using of specific data more simpler for Table Components props and other needs
	 */
	const { engineModels, engineFamilies } = data;

	/**
	 * recreate the array to fit the select component props
	 * options = [{calue, title}]
	 */
	const familyOptions = engineFamilies.map(({ id, name }) => ({ value: id, title: name }));

	/**
	 * destructure of modal costum store
	 * make using method more simpler
	 */
	const { isConfirm, isDelete, isUpdate, isCreate, isDetail } = modal$;

	/**
	 * define the table column
	 * data from page.server.js need to shape as fit as the defined columns
	 */
	const dataCol = [
		{
			header: 'Name',
			accessor: 'name'
		},
		{
			header: 'Description',
			accessor: 'description'
		},
		{
			header: 'Family',
			accessor: 'family'
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
			$form.name = $_row?.original?.name;
			$form.description = $_row?.original?.description;
			$form.family_id = $_row?.original?.family_id;
		} else {
			$form.name = '';
			$form.description = '';
			$form.family_id = '';
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
	<title>Manage : Engine Models</title>
</svelte:head>

{#if $isDetail}
	<Modal id="detail" position="right">
		<div class="list-container">
			<div class="list-header">
				<h1 class="list-title">Detail Form</h1>
				<Btn title="Update" color="warning" on:click={() => modal$.show('update')} />
			</div>
			<div class="list-content">
				<div class="list-row">
					<span class="list-row-title">Model Name: </span>
					<span class="list-row-content">{$_row?.original?.name}</span>
				</div>
				<div class="list-row">
					<span class="list-row-title">Description: </span>
					<span class="list-row-content">{$_row?.original?.description}</span>
				</div>
				<div class="list-row">
					<span class="list-row-title">Family: </span>
					<span class="list-row-content">{$_row?.original?.family}</span>
				</div>
			</div>
		</div>
	</Modal>
{/if}

{#if $isUpdate}
	<Modal id="update" position="right">
		<Form id="update" action="?/update" title="Update" method="POST" {enhance}>
			<Text id="id" name="id" bind:value={$_row.original.id} hidden />
			<Text id="name" name="name" label="Model Name" bind:value={$form.name} error={$errors.name} />
			<Text id="description" name="description" label="Model Description" bind:value={$form.description} error={$errors.description} />
			<Select id="family_id" name="family_id" label="Family" options={familyOptions} bind:value={$form.family_id} error={$errors.family_id} />
		</Form>
	</Modal>
{/if}

{#if $isCreate}
	<Modal id="create" position="right">
		<SuperDebug data={$form} />
		<Form id="create" action="?/create" title="Create" method="POST" {enhance}>
			<Text id="name" name="name" label="Model Name" bind:value={$form.name} error={$errors.name} />
			<Text id="description" name="description" label="Model Description" bind:value={$form.description} error={$errors.description} />
			<Select id="family_id" name="family_id" label="Family" options={familyOptions} bind:value={$form.family_id} error={$errors.family_id} />
		</Form>
	</Modal>
{/if}

{#if $isDelete}
	<!-- <Modal id="delete" position="mid">Content</Modal> -->
	<div class="absolute flex right-0 bottom-10 justify-center items-center mx-auto z-20 h-max bg-orange-200 shadow w-max py-3 pl-6 pr-3 space-x-3">
		<span>Delete {selectedRows.length} selected data?</span>
		<button class="px-4 py-1 bg-red-400 text-xs" on:click={() => modal$.show('confirm')}>Yes</button>
		<button class="px-4 py-1 bg-green-200 text-xs" on:click={handleReset}>Reset</button>
	</div>
{/if}

{#if $isConfirm}
	<Modal id="confirm">
		<div class="list-container">
			<div class="list-header">
				<h1 class="list-title">Are you sure ?</h1>
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
			<div class="list-content" />
		</div>
	</Modal>
{/if}

<div class="manage-container">
	<div class="manage-l">
		<div class="bg-slate-200 m-4 px-4 pt-2 pb-6 h-fit shadow-lg">
			<h1 class="text-xl text-slate-700 font-extrabold">Total Models</h1>
			<p class="text-base font-semibold">15 Families</p>
			<p class="text-slate-600">Engine Models are categorize by it's varian.</p>
		</div>
	</div>
	<div class="manage-r">
		<div class="manage-r-header">
			<div class="manage-r-title">
				<span class="title">Engine Models</span>
				<Search bind:value={search} />
			</div>
			<div class="manage-r-action">
				<div class="btn-group">
					<Btn title="Create" on:click={() => modal$.show('create')} />
					<Btn title="Export" color="success" on:click={() => handleExport()} />
				</div>
			</div>
		</div>
		<div class="manage-r-content">
			<!-- <Table dataTable={engineFamily} {dataCol} {search} bind:selectedRows /> -->
			<svelte:component this={Table} dataTable={engineModels} {dataCol} {search} bind:selectedRows bind:exportJSON />
		</div>
	</div>
</div>
