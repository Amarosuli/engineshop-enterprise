<script>
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import isBetween from 'dayjs/plugin/isBetween';
	import { invalidateAll } from '$app/navigation';

	import { modal$ } from '$lib/utils/Stores';
	import { CommonHelpers } from '$lib/utils/CommonHelpers';
	import { Modal, Search, Select, Table, Form, File, Text, Switch, TextArea, Btn, Date } from '$lib/components';

	dayjs.extend(relativeTime);
	dayjs.extend(isBetween);

	export let data;

	/**
	 * Superform: applyAction set to false so we can handle onResult.
	 * onResult void success, reload page using window.location. goto method not work
	 */
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

	/**
	 * destructure of data from page.server.js
	 * make using of specific data more simpler for Table Components props and other needs
	 */
	const { engineList, engineModels, customers, preservationList } = data;

	const durationOptions = [
		{ value: '90', title: '90 Days' },
		{ value: '180', title: '180 Days' },
		{ value: '360', title: '360 Days' }
	];

	let dataTable;
	$: dataTable = data.engineList.map((value) => ({ ...value, preserveDetail: preservationList.find(({ engine_id }) => engine_id === value.id) || {} }));
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
			header: 'ESN',
			accessor: 'esn'
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
			header: 'Preserve Detail',
			accessor: 'preserveDetail',
			cell: ({ row }) => {
				// this check will place on the CommonHelper soon
				if (Object.keys(row.original.preserveDetail).length === 0 && row.original.preserveDetail.constructor === Object) {
					return 'No Data';
				} else {
					return 'Data Available';
				}
			}
		},
		{
			header: 'Notes',
			accessor: 'notes'
		}
	];

	let selectedRows = [];
	let search = '';
	let exportJSON;

	function handleReset() {
		let elements = document.querySelectorAll('[data-isChecked]');
		elements.forEach((el) => {
			// el.getAttribute('dataset-isChecked') === 'true' -- old
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
		if (isTrue) {
			CommonHelpers.mergeObject($form, $isDetail.data.preserveDetail); // next add options = {set = {key: '', value: ''}} to specific merge value
		} else {
			CommonHelpers.resetObject($form); // next add options = {set = {key: '', value: ''}} to specific merge value
			$form.engine_id = $isDetail.data.id; // curently use this scenario
		}
	}

	$: $isUpdate ? setUpdate(1) : '';
	$: $isCreate ? setUpdate(0) : '';

	/**
	 * @TODO FOR THIS PAGE
	 * 1. handle create ( redirect still going to the wrong path)
	 * 2. handle update
	 * 3. delete is happen via pocketbase ( follow it parent id (engine_id) if deleted )
	 * 4. simplified the functions, like impelementation of dayjs in modal detail
	 * 5. create card ( left side ) for notification dashboard
	 */
</script>

<svelte:head>
	<title>Manage : Engine Preservation</title>
</svelte:head>

{#if $isDetail}
	<Modal id="detail" position="right">
		<div class="list-container">
			<div class="list-header">
				<h1 class="list-title">Detail Form</h1>
				{#if Object.keys($isDetail?.data?.preserveDetail).length === 0 && $isDetail?.data?.preserveDetail.constructor === Object}
					<Btn title="Create" color="warning" on:click={() => modal$.show('create', $isDetail?.data)} />
				{:else}
					<Btn title="Update" color="warning" on:click={() => modal$.show('update', $isDetail?.data)} />
				{/if}
			</div>
			<div class="list-content">
				<div class="list-row">
					<span class="list-row-title">Engine Serial Number: </span>
					<span class="list-row-content">{$isDetail?.data?.esn}</span>
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
					<span class="list-row-title">Serviceability: </span>
					<span class="list-row-content peer select-none" class:bg-sky-300={$isDetail?.data?.isServiceable} class:bg-red-300={!$isDetail?.data?.isServiceable}
						>{$isDetail?.data?.isServiceable ? 'Serviceable' : 'Unserviceable'}
					</span>
					<span class="absolute z-40 text-xxs right-0 select-none -top-7 px-3 opacity-0 py-2 bg-slate-700 text-slate-50 peer-hover:opacity-100 transition-opacity ease-out rounded-lg"
						>Change this on manage/engine-list</span>
				</div>
				<div class="list-row relative">
					<span class="list-row-title">Preservation: </span>
					<span class="list-row-content peer select-none" class:bg-sky-300={$isDetail?.data?.isPreservable} class:bg-red-300={!$isDetail?.data?.isPreservable}
						>{$isDetail?.data?.isPreservable ? 'Controlled' : 'Uncontrolled'}</span>
					<span class="absolute z-40 text-xxs right-0 select-none -top-7 px-3 opacity-0 py-2 bg-slate-700 text-slate-50 peer-hover:opacity-100 transition-opacity ease-out rounded-lg"
						>Change this on manage/engine-list</span>
				</div>
				<div class="list-row">
					<span class="list-row-title">Notes: </span>
					<span class="list-row-content">{$isDetail?.data?.notes}</span>
				</div>
			</div>
			<div class="list-header">
				<h1 class="list-title">Preservation Data</h1>
			</div>
			<div class="list-content">
				{#if Object.keys($isDetail?.data?.preserveDetail).length !== 0}
					{@const isExpired = dayjs().isAfter(dayjs($isDetail?.data?.preserveDetail?.date_performed).add($isDetail?.data?.preserveDetail?.duration, 'day'))}
					{@const isGood = dayjs().isBefore(dayjs($isDetail?.data?.preserveDetail?.date_performed).add($isDetail?.data?.preserveDetail?.duration, 'day'))}
					<!-- why -->
					{@const isReady = dayjs().isBetween(
						dayjs($isDetail?.data?.preserveDetail?.date_performed).add($isDetail?.data?.preserveDetail?.duration - 14, 'day'),
						dayjs($isDetail?.data?.preserveDetail?.date_performed).add($isDetail?.data?.preserveDetail?.duration, 'day'),
						'day'
					)}
					<div class="list-row">
						<span class="list-row-title">Last Performed: </span>
						<span class="list-row-content">{$isDetail?.data?.preserveDetail?.date_performed && dayjs($isDetail?.data?.preserveDetail?.date_performed).format('DD / MMM / YYYY')}</span>
					</div>
					<div class="list-row">
						<span class="list-row-title">Renewal Duration: </span>
						<span class="list-row-content">{$isDetail?.data?.preserveDetail?.duration && $isDetail?.data?.preserveDetail?.duration} Days</span>
					</div>
					<div class="list-row">
						<span class="list-row-title">Expired Date: </span>
						<span class="list-row-content"
							>{$isDetail?.data?.preserveDetail?.date_performed &&
								dayjs($isDetail?.data?.preserveDetail?.date_performed).add($isDetail?.data?.preserveDetail?.duration, 'day').format('DD / MMM / YYYY')}</span>
					</div>
					<div class="list-row">
						<span class="list-row-title">Status: </span>
						<div class="flex justify-center items-center">
							<span class="list-row-content text-xxs" class:bg-yellow-400={isReady} class:bg-green-400={isGood} class:bg-red-400={isExpired}>
								{isGood ? 'Good' : ''} {isReady ? 'and Ready to Preserve' : ''}{isExpired ? 'Expired since' : ''}</span>
							<span class="list-row-content">{dayjs().to(dayjs($isDetail?.data?.preserveDetail?.date_performed).add($isDetail?.data?.preserveDetail?.duration, 'day'))}</span>
						</div>
					</div>
					<div class="list-row">
						<span class="list-row-title">Material: </span>
						<span class="list-row-content">{$isDetail?.data?.preserveDetail?.date_performed && $isDetail?.data?.preserveDetail?.material}</span>
					</div>
				{:else}
					<div class="list-row">
						<span class="list-row-title">No Data</span>
					</div>
				{/if}
			</div>
		</div>
	</Modal>
{/if}

{#if $isUpdate}
	<Modal id="update" position="right">
		<SuperDebug data={$form} />
		<Form id="update" action="?/update" title="Update" method="POST" enctype="multipart/form-data" {enhance}>
			<Text id="id" name="id" bind:value={$isUpdate.data.preserveDetail.id} hidden />
			<Text id="esn" name="esn" label="Engine Serial Number" bind:value={$isUpdate.data.esn} disabled />
			<Select id="duration" name="duration" label="Preserve Duration" bind:value={$form.duration} options={durationOptions} />
			<Date id="date_performed" name="date_performed" label="Date Performed" bind:value={$form.date_performed} />
			<File id="tag" name="tag" label="Preserve Tag" />
			<TextArea id="material" name="material" label="Material" bind:value={$form.material} />
		</Form>
	</Modal>
{/if}

{#if $isCreate}
	<Modal id="create" position="right">
		<SuperDebug data={$form} />
		<Form id="create" action="?/create" title="Create" method="POST" enctype="multipart/form-data" {enhance}>
			<Text id="engine_id" name="engine_id" bind:value={$form.engine_id} hidden />
			<Text id="esn" name="esn" label="Engine Serial Number" bind:value={$isCreate.data.esn} disabled />
			<Select id="duration" name="duration" label="Preserve Duration" bind:value={$form.duration} options={durationOptions} />
			<Date id="date_performed" name="date_performed" label="Date Performed" bind:value={$form.date_performed} />
			<File id="tag" name="tag" label="Preserve Tag" />
			<TextArea id="material" name="material" label="Material" bind:value={$form.material} />
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
	<div class="manage-l !hidden">
		<div class="bg-slate-200 m-4 px-4 pt-2 pb-6 h-fit shadow-lg">
			<h1 class="text-xl text-slate-700 font-extrabold">Total Customer</h1>
			<p class="text-base font-semibold">15 engineList</p>
			<p class="text-slate-600">Engine Models are categorize by it's varian.</p>
		</div>
	</div>
	<div class="manage-r">
		<div class="manage-r-header">
			<div class="manage-r-title">
				<span class="title">Engine Preservation</span>
				<Search bind:value={search} />
			</div>
			<div class="manage-r-action">
				<div class="btn-group">
					<!-- <Btn title="Create" on:click={() => modal$.show('create')} /> -->
					<Btn title="Export" color="success" on:click={() => handleExport()} />
				</div>
			</div>
		</div>
		<div class="manage-r-content">
			<svelte:component this={Table} {dataTable} {dataCol} {search} on:rowClick={handleRowClick} bind:selectedRows bind:exportJSON />
		</div>
	</div>
</div>
