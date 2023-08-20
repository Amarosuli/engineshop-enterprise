<script>
	import { superForm, defaultValues } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';

	import { modal$ } from '$lib/utils/Stores';
	import { CommonHelpers } from '$lib/utils/CommonHelpers';
	import { Modal, Search, Select, Table, Form, Text, Switch, Link, TextArea, Btn } from '$lib/components';

	export let data;

	const { form, errors, enhance } = superForm(data.form, {
		applyAction: false,
		taintedMessage: null,
		onResult: async ({ result }) => {
			if (result.type === 'success') {
				invalidateAll();
				modal$.reset();
			}
		}
	});
	const formDefault = defaultValues(CommonHelpers.engineListSchema);

	const { engineModels, customers } = data;
	let dataTable;
	$: dataTable = data.engineList;
	const modelOptions = engineModels.map(({ id, name }) => ({ value: id, title: name }));
	const customerOptions = customers.map(({ id, name }) => ({ value: id, title: name }));
	const { isConfirm, isDelete, isUpdate, isCreate, isDetail } = modal$;
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
			header: 'Availability',
			accessor: 'isAvailable',
			cell: ({ row }) => {
				if (row.original.isAvailable) return 'Available';
				return 'Not Available';
			}
		},
		{
			header: 'Serviceability',
			accessor: 'isServiceable',
			cell: ({ row }) => {
				if (row.original.isServiceable) return 'Serviceable';
				return 'Unserviceable';
			}
		},
		{
			header: 'Preserve',
			accessor: 'isPreservable',
			cell: ({ row }) => {
				if (row.original.isPreservable) return 'Controlled';
				return 'Uncontrolled';
			}
		},
		{
			header: 'Notes',
			accessor: 'notes'
		}
	];

	let selectedRows = [];
	let search = $page.url.searchParams.get('esn') || '';
	let exportJSON;

	function handleReset() {
		let elements = document.querySelectorAll('[data-isChecked]');
		elements.forEach((el) => {
			if (el.dataset.ischecked === 'true') {
				el.click();
			}
		});
	}

	function handleExport() {
		console.log(exportJSON);
	}

	function handleRowClick(e) {
		let rowData = e.detail.rowData.original;
		modal$.show('detail', rowData);
	}

	function setUpdate(isTrue) {
		isTrue ? CommonHelpers.mergeObject($form, $isUpdate.data) : CommonHelpers.mergeObject($form, formDefault);
		console.log(formDefault);
	}

	$: $isUpdate ? setUpdate(1) : '';
	$: $isCreate ? setUpdate(0) : '';
</script>

<svelte:head>
	<title>Manage : Engine List</title>
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
					<span class="list-row-title">Engine Serial Number: </span>
					<span class="list-row-content">{$isDetail?.data?.esn}</span>
				</div>
				<div class="list-row">
					<span class="list-row-title">Configuration: </span>
					<span class="list-row-content">{$isDetail?.data?.config}</span>
				</div>
				<div class="list-row">
					<span class="list-row-title">Model Name: </span>
					<span class="list-row-content">{$isDetail?.data?.model}</span>
				</div>
				<div class="list-row">
					<span class="list-row-title">Customer Name: </span>
					<span class="list-row-content">{$isDetail?.data?.customer}</span>
				</div>
				<div class="list-row relative">
					<span class="list-row-title">Availability: </span>
					<Link href="/app/engine-preservation/?esn={$isDetail?.data?.esn}" title="Edit" />
					<span class="list-row-content text-xxs font-semibold peer" class:bg-green-300={$isDetail?.data?.isAvailable} class:bg-yellow-300={!$isDetail?.data?.isAvailable}
						>{$isDetail?.data?.isAvailable ? 'Available in shop' : 'Not available'}</span>

					<span class="absolute z-40 text-xxs right-0 select-none -top-7 px-3 opacity-0 py-2 bg-slate-700 text-slate-50 peer-hover:opacity-100 transition-opacity ease-out rounded-lg"
						>Change this on app/engine-preservation</span>
				</div>
				<div class="list-row">
					<span class="list-row-title">Serviceability: </span>
					<span class="list-row-content text-xxs font-semibold" class:bg-green-300={$isDetail?.data?.isServiceable} class:bg-yellow-300={!$isDetail?.data?.isServiceable}
						>{$isDetail?.data?.isServiceable ? 'Serviceble' : 'Unserviceable'}</span>
				</div>
				<div class="list-row">
					<span class="list-row-title">Preservation: </span>
					<span class="list-row-content text-xxs font-semibold" class:bg-green-300={$isDetail?.data?.isPreservable} class:bg-yellow-300={!$isDetail?.data?.isPreservable}
						>{$isDetail?.data?.isPreservable ? 'Preservation maintained' : 'Preservation not maintained'}</span>
				</div>
				<div class="list-row">
					<span class="list-row-title">Notes: </span>
					<span class="list-row-content">{$isDetail?.data?.notes}</span>
				</div>
			</div>
		</div>
	</Modal>
{/if}

{#if $isUpdate}
	<Modal id="update" position="right">
		<Form id="update" action="?/update" title="Update" method="POST" {enhance}>
			<Text id="id" name="id" bind:value={$isUpdate.data.id} hidden />
			<Text id="esn" name="esn" label="Engine Serial Number" bind:value={$form.esn} error={$errors.esn} />
			<Text id="config" name="config" label="Configuration" bind:value={$form.config} error={$errors.config} />
			<Select id="model_id" name="model_id" label="Engine Model" bind:value={$form.model_id} options={modelOptions} />
			<Select id="customer_id" name="customer_id" label="Customer" bind:value={$form.customer_id} options={customerOptions} />
			<!-- <Switch id="isAvailable" name="isAvailable" label="Availability" bind:value={$form.isAvailable} /> CHANGE THIS ONLY AT APP/ENGINE-PRESERVATION -->
			<Switch id="isServiceable" name="isServiceable" label="Serviceability" bind:value={$form.isServiceable} />
			<Switch id="isPreservable" name="isPreservable" label="Preservation" bind:value={$form.isPreservable} />
			<TextArea id="notes" name="notes" label="Notes" bind:value={$form.notes} error={$errors.notes} />
		</Form>
	</Modal>
{/if}

{#if $isCreate}
	<Modal id="create" position="right">
		<!-- <SuperDebug data={$form} /> -->
		<Form id="create" action="?/create" title="Create" method="POST" {enhance}>
			<Text id="esn" name="esn" label="Engine Serial Number" bind:value={$form.esn} error={$errors.esn} />
			<Text id="config" name="config" label="Configuration" bind:value={$form.config} error={$errors.config} />
			<Select id="model_id" name="model_id" label="Engine Model" bind:value={$form.model_id} options={modelOptions} />
			<Select id="customer_id" name="customer_id" label="Customer" bind:value={$form.customer_id} options={customerOptions} />
			<!-- <Switch id="isAvailable" name="isAvailable" label="Availability" bind:value={$form.isAvailable} disabled /> is always true when create -->
			<Switch id="isServiceable" name="isServiceable" label="Serviceability" bind:value={$form.isServiceable} />
			<Switch id="isPreservable" name="isPreservable" label="Preservation" bind:value={$form.isPreservable} />
			<TextArea id="notes" name="notes" label="Notes" bind:value={$form.notes} error={$errors.notes} />
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
			<h1 class="text-xl text-slate-700 font-extrabold">Total Customer</h1>
			<p class="text-base font-semibold">15 engineList</p>
			<p class="text-slate-600">Engine Models are categorize by it's varian.</p>
		</div>
	</div>
	<div class="manage-r">
		<div class="manage-r-header">
			<div class="manage-r-title">
				<span class="title">Engine List</span>
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
			<svelte:component this={Table} {dataTable} {dataCol} {search} on:rowClick={handleRowClick} bind:selectedRows bind:exportJSON />
		</div>
	</div>
</div>
