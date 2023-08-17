<script>
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import isBetween from 'dayjs/plugin/isBetween';

	import { _row, modal$ } from '$lib/utils/Stores';
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
	const { engineList, engineModels, customers, preservationList } = data;

	const durationOptions = [
		{ value: 90, title: '90 Days' },
		{ value: 180, title: '180 Days' },
		{ value: 360, title: '360 Days' }
	];

	const tableData = engineList.map((value) => ({ ...value, preserveDetail: preservationList.find(({ engine_id }) => engine_id === value.id) || {} }));
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
	$: $isCreate ? setUpdate(1) : '';

	/**
	 * this is for handling the stored data where the superform rely on it
	 * for case the update form, form data (superform) need to override with
	 * the rows data store. which is used for display the detail form.
	 * but for create form , the form data need to reset as an empty.
	 */
	function setUpdate(isTrue) {
		if (isTrue) {
			CommonHelpers.mergeObject($form, $_row?.original);
		} else {
			CommonHelpers.resetObject($form);
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
	<title>Manage : Engine Preservation</title>
</svelte:head>

{#if $isDetail}
	<Modal id="detail" position="right">
		<div class="list-container">
			<div class="list-header">
				<h1 class="list-title">Detail Form</h1>
				{#if Object.keys($_row?.original?.preserveDetail).length === 0 && $_row?.original?.preserveDetail.constructor === Object}
					<Btn title="Create" color="warning" on:click={() => modal$.show('create')} />
				{:else}
					<Btn title="Update" color="warning" on:click={() => modal$.show('update')} />
				{/if}
			</div>
			<div class="list-content">
				<div class="list-row">
					<span class="list-row-title">Engine Serial Number: </span>
					<span class="list-row-content">{$_row?.original?.esn}</span>
				</div>
				<div class="list-row">
					<span class="list-row-title">Model Name: </span>
					<span class="list-row-content">{$_row?.original?.model}</span>
				</div>
				<div class="list-row">
					<span class="list-row-title">Customer Name: </span>
					<span class="list-row-content">{$_row?.original?.customer}</span>
				</div>
				<div class="list-row relative">
					<span class="list-row-title">Serviceability: </span>
					<span class="list-row-content peer select-none" class:bg-sky-300={$_row?.original?.isServiceable} class:bg-red-300={!$_row?.original?.isServiceable}>{$_row?.original?.isServiceable ? 'Serviceable' : 'Unserviceable'} </span>
					<span class="absolute z-40 text-xxs right-0 select-none -top-7 px-3 opacity-0 py-2 bg-slate-700 text-slate-50 peer-hover:opacity-100 transition-opacity ease-out rounded-lg">Change this on manage/engine-list</span>
				</div>
				<div class="list-row relative">
					<span class="list-row-title">Preservation: </span>
					<span class="list-row-content peer select-none" class:bg-sky-300={$_row?.original?.isPreservable} class:bg-red-300={!$_row?.original?.isPreservable}>{$_row?.original?.isPreservable ? 'Controlled' : 'Uncontrolled'}</span>
					<span class="absolute z-40 text-xxs right-0 select-none -top-7 px-3 opacity-0 py-2 bg-slate-700 text-slate-50 peer-hover:opacity-100 transition-opacity ease-out rounded-lg">Change this on manage/engine-list</span>
				</div>
				<div class="list-row">
					<span class="list-row-title">Notes: </span>
					<span class="list-row-content">{$_row?.original?.notes}</span>
				</div>
			</div>
			<div class="list-header">
				<h1 class="list-title">Preservation Data</h1>
			</div>
			<div class="list-content">
				{#if Object.keys($_row.original.preserveDetail).length !== 0}
					{@const isExpired = dayjs().isAfter(dayjs($_row?.original?.preserveDetail?.date_performed).add($_row?.original?.preserveDetail?.duration, 'day'))}
					{@const isGood = dayjs().isBefore(dayjs($_row?.original?.preserveDetail?.date_performed).add($_row?.original?.preserveDetail?.duration, 'day'))}
					<!-- why -->
					{@const isReady = dayjs().isBetween(dayjs($_row?.original?.preserveDetail?.date_performed).add($_row?.original?.preserveDetail?.duration - 14, 'day'), dayjs($_row?.original?.preserveDetail?.date_performed).add($_row?.original?.preserveDetail?.duration, 'day'), 'day')}
					<div class="list-row">
						<span class="list-row-title">Last Performed: </span>
						<span class="list-row-content">{$_row?.original?.preserveDetail?.date_performed && dayjs($_row?.original?.preserveDetail?.date_performed).format('DD / MMM / YYYY')}</span>
					</div>
					<div class="list-row">
						<span class="list-row-title">Renewal Duration: </span>
						<span class="list-row-content">{$_row?.original?.preserveDetail?.duration && $_row?.original?.preserveDetail?.duration} Days</span>
					</div>
					<div class="list-row">
						<span class="list-row-title">Expired Date: </span>
						<span class="list-row-content">{$_row?.original?.preserveDetail?.date_performed && dayjs($_row?.original?.preserveDetail?.date_performed).add($_row?.original?.preserveDetail?.duration, 'day').format('DD / MMM / YYYY')}</span>
					</div>
					<div class="list-row">
						<span class="list-row-title">Status: </span>
						<div class="flex justify-center items-center">
							<span class="list-row-content text-xxs" class:bg-yellow-400={isReady} class:bg-green-400={isGood} class:bg-red-400={isExpired}> {isGood ? 'Good' : ''} {isReady ? 'and Ready to Preserve' : ''}{isExpired ? 'Expired since' : ''}</span>
							<span class="list-row-content">{dayjs().to(dayjs($_row?.original?.preserveDetail?.date_performed).add($_row?.original?.preserveDetail?.duration, 'day'))}</span>
						</div>
					</div>
					<div class="list-row">
						<span class="list-row-title">Material: </span>
						<span class="list-row-content">{$_row?.original?.preserveDetail?.date_performed && $_row?.original?.preserveDetail?.material}</span>
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
			<Text id="id" name="id" bind:value={$_row.original.id} hidden />
			<Text id="esn" name="esn" label="Engine Serial Number" bind:value={$form.esn} disabled />
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
			<Text id="id" name="id" bind:value={$_row.original.id} hidden />
			<Text id="engine_id" name="engine_id" bind:value={$_row.original.id} hidden />
			<Text id="esn" name="esn" label="Engine Serial Number" bind:value={$form.esn} error={$errors.esn} disabled />
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
			<!-- <Table dataTable={engineFamily} {dataCol} {search} bind:selectedRows /> -->
			<svelte:component this={Table} dataTable={tableData} {dataCol} {search} bind:selectedRows bind:exportJSON />
		</div>
	</div>
</div>
