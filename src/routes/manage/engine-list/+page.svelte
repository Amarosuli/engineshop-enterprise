<script>
	import { superForm, defaultValues } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';

	import ModalEngineHistory from './ModalEngineHistory.svelte';
	import ModalPreservationHistory from './ModalPreservationHistory.svelte';

	import { modal$ } from '$lib/utils/Stores';
	import { CommonHelpers } from '$lib/utils/CommonHelpers';
	import { Select, Table, Text, Switch, Stat, Button, TextArea, Btn, Modal, List, Form } from '$lib/components';

	export let data;

	const { form, errors, enhance } = superForm(data.form, {
		applyAction: false,
		taintedMessage: null,
		onResult: async ({ result }) => {
			if (result.type === 'success') {
				invalidateAll();
				modal$.reset();
				loadingRefresh = true;
			}
		}
	});

	const formDefault = defaultValues(CommonHelpers.engineListSchema);

	const { engineModels, customers } = data;

	let dataTable;
	let loadingRefresh = false;
	let totalEngine = data.engineList.length;

	$: (dataTable = data.engineList), (loadingRefresh = false);

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
				if (row.original.isAvailable && row.original.isAvailable.status == 'INCOMING') return 'Available';
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

	let search = $page.url.searchParams.get('esn') || '';
	function handleRowClick(e) {
		let rowData = e.detail.rowData.original;
		modal$.show('detail', rowData);
	}

	function setUpdate(isTrue) {
		isTrue ? CommonHelpers.mergeObject($form, $isUpdate.data) : CommonHelpers.mergeObject($form, formDefault);
	}

	$: $isUpdate ? setUpdate(1) : '';
	$: $isCreate ? setUpdate(0) : '';

	// $: console.log($modal$.find((v) => v.id === 'engine_history')?.data);
</script>

<svelte:head>
	<title>Manage : Engine List</title>
</svelte:head>

{#if $isDetail}
	<Modal.Root let:id id="detail" position="right">
		<Modal.Header>
			<Modal.Title title="Detail Form" />
			<Modal.Action>
				<Btn title="Update" color="warning" hidden={data?.user !== null ? false : true} on:click={() => modal$.show('update', $isDetail?.data)} />
				<Modal.Close on:Close={() => modal$.hide(id)} />
			</Modal.Action>
		</Modal.Header>
		<Modal.Body>
			<List.Item>
				<span>Engine Serial Number</span>
				<span class="font-bold text-right">{$isDetail.data?.esn}</span>
			</List.Item>
			<List.Item>
				<span>Configuration</span>
				<span class="font-bold text-right">{$isDetail.data?.config}</span>
			</List.Item>
			<List.Item>
				<span>Model</span>
				<span class="font-bold text-right">{$isDetail.data?.model}</span>
			</List.Item>
			<List.Item>
				<span>Customer</span>
				<span class="font-bold text-right">{$isDetail.data?.customer}</span>
			</List.Item>
			<List.Item>
				<Btn title="Availability" color="light" on:click={async () => modal$.show('engine_history', $isDetail.data?.id)}>
					<span class="text-green-600"><i class="ri-history-line ri-1x" /></span>
				</Btn>

				<div class="flex justify-end items-center gap-2">
					<span class="text-right text-xxs font-semibold">
						<!-- this status query from engine_availability by get latest data and check if status is INCOMING or OUTGOING -->
						<span class="py-1 px-3 rounded-full" class:bg-green-300={$isDetail?.data?.isAvailable?.status == 'INCOMING'} class:bg-yellow-300={$isDetail?.data?.isAvailable?.status == 'OUTGOING'}
							>{$isDetail?.data?.isAvailable?.status == 'INCOMING' ? 'Available in shop' : 'Not available'}</span>
					</span>
				</div>
			</List.Item>
			<List.Item>
				<span>Serviceability</span>
				<div class="flex justify-end items-center gap-2">
					<span class="text-right text-xxs font-semibold">
						<span class="py-1 px-3 rounded-full" class:bg-green-300={$isDetail?.data?.isServiceable} class:bg-yellow-300={!$isDetail?.data?.isServiceable}
							>{$isDetail?.data?.isServiceable ? 'Serviceble' : 'Unserviceable'}</span>
					</span>
				</div>
			</List.Item>
			<List.Item>
				<Btn title="Preservability" color="light" on:click={async () => modal$.show('preservation_history', $isDetail.data?.id)}>
					<span class="text-green-600"><i class="ri-history-line ri-1x" /></span>
				</Btn>
				<div class="flex justify-end items-center gap-2">
					<span class="text-right text-xxs font-semibold">
						<span class="py-1 px-3 rounded-full" class:bg-green-300={$isDetail?.data?.isPreservable} class:bg-yellow-300={!$isDetail?.data?.isPreservable}
							>{$isDetail?.data?.isPreservable ? 'Preservation maintained' : 'Preservation not maintained'}</span>
					</span>
				</div>
			</List.Item>
			<List.Item>
				<span>Notes</span>
				<span class="font-bold text-right">{$isDetail.data?.notes}</span>
			</List.Item>
		</Modal.Body>
		<Modal.Footer>
			<Modal.Cancel on:Cancel={() => modal$.hide(id)} />
		</Modal.Footer>
	</Modal.Root>
{/if}

{#if $modal$.find((v) => v.id === 'engine_history')}
	<ModalEngineHistory engineId={$isDetail.data?.id} />
{/if}

{#if $modal$.find((v) => v.id === 'preservation_history')}
	<ModalPreservationHistory engineId={$isDetail.data?.id} />
{/if}

{#if $isUpdate}
	<Modal.Root let:id id="update" position="right">
		<Modal.Header>
			<Modal.Title title="Update Form" />
			<Modal.Action>
				<Modal.Close on:Close={() => modal$.hide(id)} />
			</Modal.Action>
		</Modal.Header>
		<Modal.Body>
			<Form.Root {id} action="?/update" method="POST" {enhance}>
				<Form.Item>
					<Text id="id" name="id" bind:value={$isUpdate.data.id} hidden />
					<Text id="esn" name="esn" label="Engine Serial Number" bind:value={$form.esn} error={$errors.esn} />
					<Text id="config" name="config" label="Configuration" bind:value={$form.config} error={$errors.config} />
					<Select id="model_id" name="model_id" label="Engine Model" bind:value={$form.model_id} options={modelOptions} />
					<Select id="customer_id" name="customer_id" label="Customer" bind:value={$form.customer_id} options={customerOptions} />
					<Switch id="isServiceable" name="isServiceable" label="Serviceability" bind:value={$form.isServiceable} />
					<Switch id="isPreservable" name="isPreservable" label="Preservation" bind:value={$form.isPreservable} />
					<TextArea id="notes" name="notes" label="Notes" bind:value={$form.notes} error={$errors.notes} />
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
		<Modal.Header>
			<Modal.Title title="Create Form" />
			<Modal.Action>
				<Modal.Close on:Close={() => modal$.hide(id)} />
			</Modal.Action>
		</Modal.Header>
		<Modal.Body>
			<Form.Root {id} action="?/create" method="POST" {enhance}>
				<Form.Item>
					<Text id="esn" name="esn" label="Engine Serial Number" bind:value={$form.esn} error={$errors.esn} />
					<Text id="config" name="config" label="Configuration" bind:value={$form.config} error={$errors.config} />
					<Select id="model_id" name="model_id" label="Engine Model" bind:value={$form.model_id} options={modelOptions} />
					<Select id="customer_id" name="customer_id" label="Customer" bind:value={$form.customer_id} options={customerOptions} />
					<Switch id="isServiceable" name="isServiceable" label="Serviceability" bind:value={$form.isServiceable} />
					<Switch id="isPreservable" name="isPreservable" label="Preservation" bind:value={$form.isPreservable} />
					<TextArea id="notes" name="notes" label="Notes" bind:value={$form.notes} error={$errors.notes} />
				</Form.Item>
				<Form.Error error={$errors?.pocketbaseErrors} />
			</Form.Root>
		</Modal.Body>
		<Modal.Footer>
			<Button.Submit formId={id} />
			<Modal.Cancel on:Cancel={() => modal$.hide(id)} />
		</Modal.Footer>
	</Modal.Root>
{/if}

<div class="manage-container">
	<div class="manage-l">
		<Stat.Root>
			<Stat.Title title="Total Engine" />
			<Stat.Value value="{totalEngine} EA" />
			<Stat.Desc desc="Engine are ..   ." />
			<svelte:fragment slot="icon">
				<i class="hidden lg:block ri-home-6-fill ri-3x text-indigo-600" />
			</svelte:fragment>
		</Stat.Root>
	</div>
	<div class="manage-r relative">
		<svelte:component this={Table} {dataTable} {dataCol} {search} on:rowClick={handleRowClick} showCreateButton={data.user !== null ? true : false}>
			<span slot="title" class="title">Engine List</span>
			<span slot="description" class="text-xs">List of all engine</span>
		</svelte:component>
	</div>
</div>
