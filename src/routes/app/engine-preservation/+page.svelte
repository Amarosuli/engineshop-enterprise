<script>
	import { Select, Table, File, Text, Button, TextArea, Btn, Date, Modal, List, Password, Form } from '$lib/components';
	import { invalidateAll } from '$app/navigation';
	import { CommonHelpers } from '$lib/utils/CommonHelpers';
	import { Preservation } from '$lib/utils/Classes';
	import { superForm } from 'sveltekit-superforms/client';
	import { modal$ } from '$lib/utils/Stores';
	import { page } from '$app/stores';

	import ModalPreservationHistory from './ModalPreservationHistory.svelte';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import Board from './Board.svelte';

	export let data;

	let search = $page.url.searchParams.get('esn') || '';
	let dataTable;

	const { engineList, preservationHistory } = data;
	const { isConfirm, isDelete, isUpdate, isCreate, isDetail } = modal$;
	const { form, errors, enhance } = superForm(data.form, {
		applyAction: false,
		taintedMessage: null,
		onUpdate: ({ form }) => {
			if (form.valid) {
				invalidateAll();
				modal$.reset();
				console.log('show pop up success');
			}
		},
		onResult: async ({ result, cancel }) => {
			if (result.type === 'failure') {
				if (result.data.form.errors) {
					console.log('show pop up failed');
					cancel();
				}
			}
		},
		onError: (e) => {
			console.log(e);
		}
	});
	const durationOptions = [
		{ value: '90', title: '90 Days' },
		{ value: '180', title: '180 Days' },
		{ value: '360', title: '360 Days' }
	];

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
	$: console.log($modal$[0]);

	$: dataTable = data.engineList;
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
				<span class="text-right font-bold">{$isDetail.data?.esn}</span>
			</List.Item>
			<List.Item>
				<span>Model</span>
				<span class="text-right font-bold">{$isDetail.data?.model}</span>
			</List.Item>
			<List.Item>
				<span>Customer</span>
				<span class="text-right font-bold">{$isDetail.data?.customer}</span>
			</List.Item>

			<div class="list-header">
				<Modal.Title title="Preservation Data" />
				<Modal.Action>
					<Btn title="Insert" color="info" hidden={data.user !== null ? false : true} on:click={() => modal$.show('create', $isDetail?.data)}>
						<span class="text-green-600"><i class="ri-add-circle-line ri-1x text-white" /></span></Btn>
					<Btn title="History" color="light" on:click={async () => modal$.show('preservation_history', $isDetail.data?.id)}
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
						<div class="flex items-center justify-end">
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
	<!-- {@const sd = console.log($isUpdate.data)} -->
	<div class="absolute z-[200]">
		<SuperDebug data={$form} />
	</div>
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
					<File id="tag" name="tag" label="Preserve Tag" src={$isUpdate?.data?.tagURL} />
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
	<!-- <div class="absolute z-[200]">
		<SuperDebug data={$form} />
	</div> -->
	<Modal.Root let:id id="create" position="right">
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
{/if}

{#if $isConfirm}
	{@const username = $form.username = data?.user?.username}
	<Modal.Root let:id id="confirm" position="mid">
		<Modal.Header>
			<Modal.Title title="Are you sure?" />
			<Modal.Action>
				<Modal.Close on:Close={() => modal$.hide(id)} />
			</Modal.Action>
		</Modal.Header>
		<Modal.Body>
			<Form.Root {id} action="?/delete" method="POST" {enhance}>
				<Form.Item>
					<div class="flex w-full flex-col items-center justify-center gap-2">
						<span class="w-full text-center font-semibold">{data?.user?.username} | {data?.user?.name}</span>
						<span class="rounded-full bg-yellow-300 px-4 py-2 text-center text-xs italic">Type your password to confirm</span>
					</div>
					<Text id="username" name="username" label="Employee ID" required={true} placeholder="your employee id" bind:value={$form.username} hidden />
					<Password id="password" label="Password" placeholder="your password" bind:value={$form.password} error={$errors.password} />
					<Text id="historyId" name="historyId" required={true} value={$isConfirm.data} hidden />
				</Form.Item>
				<Form.Error error={$errors.pocketbaseErrors} />
			</Form.Root>
		</Modal.Body>
		<Modal.Footer>
			<Button.Submit title="Confirm" formId={id} />
			<Modal.Cancel on:Cancel={() => modal$.hide(id)} />
		</Modal.Footer>
	</Modal.Root>
{/if}

{#if $modal$[0]?.id == 'OverDue' || $modal$[0]?.id == 'NextDue'}
	<Modal.Root let:id id={$modal$[0]?.id} position="mid">
		<Modal.Header>
			<Modal.Title title={`Detail ${id}`} />
			<Modal.Action>
				<Modal.Close on:Close={() => modal$.hide(id)} />
			</Modal.Action>
		</Modal.Header>
		<Modal.Body>
			<div class=" h-full w-full items-center justify-center">
				<svelte:component this={Board} {preservationHistory} {engineList} showOverDue={id === 'OverDue'} showNextDue={id === 'NextDue'} />
			</div>
		</Modal.Body>
	</Modal.Root>
{/if}

<div class="manage-container">
	<div class="manage-l">
		<svelte:component this={Board} {preservationHistory} {engineList} />
	</div>
	<div class="manage-r relative">
		<svelte:component this={Table} {dataTable} dataCol={CommonHelpers.tableColumn.preservationList} {search} on:rowClick={handleRowClick} showRowSelector={false}>
			<span slot="title" class="title">Engine Preservation</span>
			<span slot="description" class="text-xs" />
			<svelte:fragment slot="action">
				<Button.Event title="Overdue" classes="btn btn_info" on:Event={() => modal$.show('OverDue')} />
				<Button.Event title="Nextdue" classes="btn btn_info" on:Event={() => modal$.show('NextDue')} />
			</svelte:fragment>
		</svelte:component>
	</div>
</div>
