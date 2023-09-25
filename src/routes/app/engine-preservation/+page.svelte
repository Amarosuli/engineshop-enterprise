<script>
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';

	import ModalPreservationHistory from './ModalPreservationHistory.svelte';
	import Board from './Board.svelte';

	import { modal$ } from '$lib/utils/Stores';
	import { CommonHelpers } from '$lib/utils/CommonHelpers';
	import { Select, Table, File, Text, Button, TextArea, Btn, Date, Modal, List, Form } from '$lib/components';

	import { Preservation } from '$lib/utils/Classes';

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
	const { engineList, preservationHistory, engineModels, customers } = data;

	const durationOptions = [
		{ value: '90', title: '90 Days' },
		{ value: '180', title: '180 Days' },
		{ value: '360', title: '360 Days' }
	];

	let dataTable;
	let loadingRefresh = false;
	$: (dataTable = data.engineList), (loadingRefresh = false);
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
		}
	];

	let search = $page.url.searchParams.get('esn') || '';

	// $: search = $page.url.searchParams.get('esn');

	function handleRowClick(e) {
		let rowData = e.detail.rowData.original;
		if (Object.keys(rowData.preserveDetail).length) {
			rowData.preserveDetail.date_performed = rowData.preserveDetail.date_performed.split(' ')[0];
		}

		modal$.show('detail', rowData);
	}

	function setUpdate(isTrue) {
		if (isTrue) {
			CommonHelpers.mergeObject($form, $isUpdate.data); // next add options = {set = {key: '', value: ''}} to specific merge value
		} else {
			CommonHelpers.resetObject($form); // next add options = {set = {key: '', value: ''}} to specific merge value
			$form.engine_id = $isDetail.data.id; // curently use this scenario
		}
	}

	$: $isUpdate ? setUpdate(1) : '';
	$: $isCreate ? setUpdate(0) : '';
</script>

<svelte:head>
	<title>Manage : Engine Preservation</title>
</svelte:head>

{#if $isDetail}
	<Modal.Root let:id id="detail" position="right">
		<Modal.Header>
			<Modal.Title title="Detail Form" />
			<Modal.Action>
				<Modal.Close on:Close={() => modal$.hide(id)} />
			</Modal.Action>
		</Modal.Header>
		<Modal.Body>
			<List.Item>
				<span>Engine Serial Number</span>
				<span class="font-bold text-right">{$isDetail.data?.esn}</span>
			</List.Item>
			<List.Item>
				<span>Model</span>
				<span class="font-bold text-right">{$isDetail.data?.model}</span>
			</List.Item>
			<List.Item>
				<span>Customer</span>
				<span class="font-bold text-right">{$isDetail.data?.customer}</span>
			</List.Item>

			<div class="list-header">
				<Modal.Title title="Preservation Data" />
				<Modal.Action>
					<Btn title="New Data" color="info" hidden={data.user !== null ? false : true} on:click={() => modal$.show('create', $isDetail?.data)} />
					<Btn title="Show History" color="light" on:click={async () => modal$.show('preservation_history', $isDetail.data?.id)}
						><span class="text-green-600"><i class="ri-history-line ri-1x" /></span>
					</Btn>
				</Modal.Action>
			</div>
			<div class="list-content">
				{#if Object.keys($isDetail?.data?.preserveDetail).length !== 0}
					{@const _preservation = new Preservation($isDetail?.data?.preserveDetail?.date_performed, $isDetail?.data?.preserveDetail?.duration)}
					<!-- {console.log(_preservation.isReady)} -->
					<List.Item>
						<span class="list-row-title">Last Performed: </span>
						<span class="list-row-content">{$isDetail?.data?.preserveDetail?.date_performed && _preservation.format}</span>
					</List.Item>
					<List.Item>
						<span class="list-row-title">Renewal Duration: </span>
						<span class="list-row-content">{$isDetail?.data?.preserveDetail?.duration && $isDetail?.data?.preserveDetail?.duration} Days</span>
					</List.Item>
					<List.Item>
						<span class="list-row-title">Expired Date: </span>
						<span class="list-row-content">{$isDetail?.data?.preserveDetail?.date_performed && _preservation.expiredDate}</span>
					</List.Item>
					<List.Item>
						<span class="list-row-title">Status: </span>
						<div class="flex justify-end items-center">
							<span class="list-row-content text-xxs" class:bg-yellow-400={_preservation.isReady} class:bg-green-400={_preservation.isValid} class:bg-red-400={_preservation.isExpired}>
								{_preservation.isValid ? 'Good' : ''} {_preservation.isReady ? 'and Ready to Preserve' : ''}{_preservation.isExpired ? 'Expired since' : ''}</span>
							<span class="list-row-content">{_preservation.preservationTime}</span>
						</div>
					</List.Item>
					<List.Item>
						<span class="list-row-title">Material: </span>
						<span class="list-row-content">{$isDetail?.data?.preserveDetail?.date_performed && $isDetail?.data?.preserveDetail?.material}</span>
					</List.Item>
				{:else}
					<List.Item>
						<span class="list-row-title">No Data</span>
					</List.Item>
				{/if}
			</div>
		</Modal.Body>
		<Modal.Footer>
			<Modal.Cancel on:Cancel={() => modal$.hide(id)} />
		</Modal.Footer>
	</Modal.Root>
{/if}

{#if $modal$.find((v) => v.id === 'preservation_history')}
	<ModalPreservationHistory engineId={$isDetail.data?.id} user={data.user} />
{/if}

{#if $isUpdate}
	<!-- <SuperDebug data={$form} /> -->
	<Modal.Root let:id id="update" position="right">
		<Modal.Header>
			<Modal.Title title="Update Form" />
			<Modal.Action>
				<Modal.Close on:Close={() => modal$.hide(id)} />
			</Modal.Action>
		</Modal.Header>
		<Modal.Body>
			<Form.Root {id} action="?/update" method="POST" enctype="multipart/form-data" {enhance}>
				<Form.Item>
					<Text id="id" name="id" bind:value={$isUpdate.data.id} hidden />
					<Text id="engine_id" name="engine_id" bind:value={$isUpdate.data.engine_id} hidden />
					<Text id="esn" name="esn" label="Engine Serial Number" bind:value={$isUpdate.data.esn} disabled />
					<Select id="duration" name="duration" label="Preserve Duration" bind:value={$form.duration} options={durationOptions} />
					<Date id="date_performed" name="date_performed" label="Date Performed" bind:value={$form.date_performed} />
					<File id="tag" name="tag" label="Preserve Tag" />
					<TextArea id="material" name="material" label="Material" bind:value={$form.material} />
				</Form.Item>
				<Form.Error />
			</Form.Root>
		</Modal.Body>
		<Modal.Footer>
			<Button.Submit formId={id} />
			<Modal.Cancel on:Cancel={() => modal$.hide(id)} />
		</Modal.Footer>
	</Modal.Root>
{/if}

{#if $isCreate}
	<Modal.Root let:id id="create" position="right">
		<SuperDebug data={$form} />
		<Modal.Header>
			<Modal.Title title="Create Form" />
			<Modal.Action>
				<Modal.Close on:Close={() => modal$.hide(id)} />
			</Modal.Action>
		</Modal.Header>
		<Modal.Body>
			<Form.Root {id} action="?/create" method="POST" enctype="multipart/form-data" {enhance}>
				<Form.Item>
					<Text id="engine_id" name="engine_id" bind:value={$form.engine_id} hidden />
					<Text id="esn" name="esn" label="Engine Serial Number" bind:value={$isCreate.data.esn} disabled />
					<Select id="duration" name="duration" label="Preserve Duration" bind:value={$form.duration} options={durationOptions} />
					<Date id="date_performed" name="date_performed" label="Date Performed" bind:value={$form.date_performed} />
					<File id="tag" name="tag" label="Preserve Tag" />
					<TextArea id="material" name="material" label="Material" bind:value={$form.material} />
				</Form.Item>
				<Form.Error />
			</Form.Root>
		</Modal.Body>
		<Modal.Footer>
			<Button.Submit formId={id} />
			<Modal.Cancel on:Cancel={() => modal$.hide(id)} />
		</Modal.Footer>
	</Modal.Root>

	<!-- <Modal id="create" position="right">
		<SuperDebug data={$form} />
		<Form id="create" action="?/create" title="Create" method="POST" enctype="multipart/form-data" {enhance}>
			<Text id="engine_id" name="engine_id" bind:value={$form.engine_id} hidden />
			<Text id="esn" name="esn" label="Engine Serial Number" bind:value={$isCreate.data.esn} disabled />
			<Select id="duration" name="duration" label="Preserve Duration" bind:value={$form.duration} options={durationOptions} />
			<Date id="date_performed" name="date_performed" label="Date Performed" bind:value={$form.date_performed} />
			<File id="tag" name="tag" label="Preserve Tag" />
			<TextArea id="material" name="material" label="Material" bind:value={$form.material} />
		</Form>
	</Modal> -->
{/if}

<div class="manage-container">
	<div class="manage-l">
		<svelte:component this={Board} {preservationHistory} {engineList} />
	</div>
	<div class="manage-r relative">
		<svelte:component this={Table} {dataTable} {dataCol} {search} on:rowClick={handleRowClick}>
			<span slot="title" class="title">Engine Preservation</span>
			<span slot="description" class="text-xs" />
		</svelte:component>
	</div>
</div>
