<script>
	import { superForm } from 'sveltekit-superforms/client';
	import { invalidateAll } from '$app/navigation';

	import { modal$ } from '$lib/utils/Stores';
	import { CommonHelpers } from '$lib/utils/CommonHelpers';
	import { Modal, Form, Search, File, Table, Text, Btn, Img, Menu, Switch } from '$lib/components';

	export let data;

	/**
	 * Superform: applyAction set to false so we can handle onResult.
	 * onResult void success, reload page using window.location. goto method not work
	 */
	const { form, errors, enhance } = superForm(data.form, {
		applyAction: false,
		onResult: async ({ result }) => {
			if (result.type === 'success') {
				invalidateAll();
				modal$.reset();
			}
		}
	});

	let dataTable;
	// let { customers } = data; DESCTRUCTURING MAKES INVALIDATEALL NOT WORKING
	$: dataTable = data.customers;

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
			header: 'Logo',
			accessor: 'logo',
			isImage: true
		},
		{
			header: 'IATA',
			accessor: 'code_IATA'
		},
		{
			header: 'ICAO',
			accessor: 'code_ICAO'
		}
	];

	let selectedRows = [];
	let search = '';
	let exportJSON;
	let hiddenColumns = [];

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

	function toggleColumn() {
		let toggleElements = document.querySelectorAll('.toggle-column');
		let arrTemplate = [];
		toggleElements.forEach((e) => {
			!e.checked && arrTemplate.push(e.id);
		});

		hiddenColumns = arrTemplate;
	}

	function handleRowClick(e) {
		let rowData = e.detail.rowData.original;
		modal$.show('detail', rowData);
	}

	/**
	 * this is for handling the stored data where the superform rely on it
	 * for case the update form, form data (superform) need to override with
	 * the rows data store. which is used for display the detail form.
	 * but for create form , the form data need to reset as an empty.
	 */
	function setUpdate(isTrue) {
		isTrue ? CommonHelpers.mergeObject($form, $isUpdate.data) : CommonHelpers.resetObject($form);
	}

	// check if data in _row store exist and id of modal update is exist (modal update open)
	$: $isUpdate ? setUpdate(1) : '';

	// reset _row store only when modal create open (so we will get the data for page.server)
	$: $isCreate ? setUpdate(0) : '';
</script>

<svelte:head>
	<title>Manage : Customers</title>
</svelte:head>

{#if $isDetail}
	<Modal id="detail" position="right">
		<div class="list-container">
			<div class="list-header">
				<h1 class="list-title">Detail Form</h1>
				<Btn title="Update" color="warning" on:click={() => modal$.show('update', $isDetail?.data)} />
			</div>
			<div class="list-content">
				<div class="list-row">
					<span class="list-row-title">Customer Name: </span>
					<span class="list-row-content">{$isDetail?.data?.name}</span>
				</div>
				<div class="list-row">
					<span class="list-row-title">Description: </span>
					<span class="list-row-content">{$isDetail?.data?.description}</span>
				</div>
				<div class="list-row">
					<span class="list-row-title">Logo: </span>
					<span class="list-row-content">
						<Img
							className="object-scale-down h-10"
							src={$isDetail?.data?.logo ? CommonHelpers.getFileUrl($isDetail?.data?.collectionId, $isDetail?.data?.id, $isDetail?.data?.logo) : '/'}
							alt={$isDetail?.data?.logo}
							crossorigin="anonymous" />
					</span>
				</div>
				<div class="list-row">
					<span class="list-row-title">IATA Code: </span>
					<span class="list-row-content">{$isDetail?.data?.code_IATA}</span>
				</div>
				<div class="list-row">
					<span class="list-row-title">ICAO Code: </span>
					<span class="list-row-content">{$isDetail?.data?.code_ICAO}</span>
				</div>
			</div>
		</div>
	</Modal>
{/if}

{#if $isUpdate}
	<Modal id="update" position="right">
		<Form id="update" action="?/update" title="Update" method="POST" enctype="multipart/form-data" {enhance}>
			<Text id="id" name="id" bind:value={$isUpdate.data.id} hidden />
			<Text id="name" name="name" label="Customer Name" bind:value={$form.name} error={$errors.name} />
			<Text id="description" name="description" label="Customer Description" bind:value={$form.description} error={$errors.description} />
			<Img
				className="w-max object-contain"
				src={$isUpdate?.data?.logo ? CommonHelpers.getFileUrl($isUpdate?.data?.collectionId, $isUpdate?.data?.id, $isUpdate?.data?.logo) : '/'}
				alt={$isUpdate?.data?.logo}
				crossorigin="anonymous" />
			<File id="logo" name="logo" label="Customer Logo" error={$errors.logo} accept="image/png, image/jpeg, image/svg+xml, image/webp" />
			<Text id="code_IATA" name="code_IATA" label="IATA Code" bind:value={$form.code_IATA} error={$errors.code_IATA} />
			<Text id="code_ICAO" name="code_ICAO" label="ICAO Code" bind:value={$form.code_ICAO} error={$errors.code_ICAO} />
		</Form>
	</Modal>
{/if}

{#if $isCreate}
	<Modal id="create" position="right">
		<Form id="create" action="?/create" title="Create" method="POST" enctype="multipart/form-data" {enhance}>
			<Text id="name" name="name" label="Customer Name" bind:value={$form.name} error={$errors?.name} />
			<Text id="description" name="description" label="Customer Description" bind:value={$form.description} error={$errors?.description} />
			<File id="logo" name="logo" label="Customer Logo" />
			<Text id="code_IATA" name="code_IATA" label="IATA Code" bind:value={$form.code_IATA} error={$errors?.code_IATA} />
			<Text id="code_ICAO" name="code_ICAO" label="ICAO Code" bind:value={$form.code_ICAO} error={$errors?.code_ICAO} />
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
	<Modal id="confirm" position="mid">
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
			<div class="modal-content" />
		</div>
	</Modal>
{/if}

<div class="manage-container">
	<div class="manage-l">
		<div class="bg-slate-200 m-4 px-4 pt-2 pb-6 h-fit shadow-lg">
			<h1 class="text-xl text-slate-700 font-extrabold">Total Customer</h1>
			<p class="text-base font-semibold">15 Customers</p>
			<p class="text-slate-600">Engine Models are categorize by it's varian.</p>
		</div>
	</div>
	<div class="manage-r">
		<div class="manage-r-header">
			<div class="manage-r-title">
				<span class="title">Customers</span>
				<Search bind:value={search} />
			</div>
			<div class="manage-r-action relative">
				<div class="btn-group">
					<Btn title="Create" color="info" on:click={() => modal$.show('create')} />
					<Btn title="Refreesh" on:click={() => invalidateAll()} />
					<Menu title="Column">
						{#each dataCol as { accessor }}
							<Switch id={accessor} className="toggle-column" label={accessor} value={true} on:change={toggleColumn} />
						{/each}
					</Menu>
					<Btn title="Export" color="success" on:click={() => handleExport()} />
				</div>
			</div>
		</div>
		<div class="manage-r-content">
			<!-- <Table dataTable={engineFamily} {dataCol} {search} bind:selectedRows /> -->
			<svelte:component this={Table} {dataTable} {dataCol} {search} on:rowClick={handleRowClick} bind:selectedRows bind:exportJSON bind:hiddenColumns />
		</div>
	</div>
</div>
