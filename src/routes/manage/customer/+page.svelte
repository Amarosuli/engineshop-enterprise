<script>
	import { superForm } from 'sveltekit-superforms/client';
	import { invalidateAll } from '$app/navigation';

	import { modal$ } from '$lib/utils/Stores';
	import { CommonHelpers } from '$lib/utils/CommonHelpers';
	import { File, Table, Text, Btn, Button, Img, Modal, List, Form, Password } from '$lib/components';
	import { tableConfig } from './config.js';

	import Board from './board.svelte';

	export let data;
	let search = '';
	let dataTable;
	let loadingRefresh = true;

	$: dataTable = data.customers;

	const { isConfirm, isUpdate, isCreate, isDetail } = modal$;

	const { form, errors, enhance } = superForm(data.form, {
		applyAction: false,
		taintedMessage: null,
		resetForm: true,
		onUpdate: ({ form }) => {
			if (form.valid) {
				invalidateAll();
				modal$.reset();
				loadingRefresh = true;
				console.log('show pop up success');
			}
		},
		onResult: ({ result, cancel }) => {
			if (result.type === 'success' && result.data.form.errors.pocketbaseErrors) {
				console.log('show pop up failure');
				cancel(); // prevent onUpdate to run
			}
		}
	});

	function handleRowClick(e) {
		let rowData = e.detail.rowData.original;
		modal$.show('detail', rowData);
	}

	/**
	 * this is for handling the stored data where the superform rely on it
	 * for case the update form, form data (superform) need to override with
	 * the rows data store. which is used for display the detail form.
	 * but for create form , the form data need to reset back to the default base on it schema.
	 * for this page, merge back to default value not necessary because the scehma doesnt contain any default value
	 */
	function setUpdate(isTrue) {
		isTrue ? CommonHelpers.mergeObject($form, $isUpdate.data) : CommonHelpers.resetObject($form);
	}

	// check if data in _row store exist and id of modal update is exist (modal update open)
	$: $isUpdate ? setUpdate(1) : '';

	// reset _row store only when modal create open (so we will get the data for page.server)
	$: $isCreate ? setUpdate(0) : '';

	let totalCustomers = data.customers.length;
</script>

<svelte:head>
	<title>Manage : Customers</title>
</svelte:head>

{#if $isDetail}
	<Modal.Root let:id id="detail" position="right">
		<Modal.Header>
			<Modal.Title title="Detail Form" />
			<Modal.Action>
				<Btn title="Update" color="warning" hidden={data?.user !== null ? false : true} on:click={() => modal$.show('update', $isDetail?.data)}>
					<i class="ri-pencil-line ri-1x text-white" /></Btn>
				<Modal.Close on:Close={() => modal$.hide(id)} />
			</Modal.Action>
		</Modal.Header>
		<Modal.Body>
			<List.Item>
				<span>Logo</span>
				<span class="flex w-full justify-end">
					<Img
						className="object-scale-down h-10 "
						src={$isDetail?.data?.logo ? CommonHelpers.getFileUrl($isDetail?.data?.collectionId, $isDetail?.data?.id, $isDetail?.data?.logo) : '/'}
						alt={$isDetail?.data?.logo}
						crossorigin="anonymous" />
				</span>
			</List.Item>
			<List.Item>
				<span>Customer Name</span>
				<span class="text-right font-bold">{$isDetail.data?.name}</span>
			</List.Item>
			<List.Item>
				<span>Description</span>
				<span class="text-right font-bold">{$isDetail.data?.description}</span>
			</List.Item>
			<List.Item>
				<span>IATA Code</span>
				<span class="text-right font-bold">{$isDetail.data?.code_IATA}</span>
			</List.Item>
			<List.Item>
				<span>ICAO Code</span>
				<span class="text-right font-bold">{$isDetail.data?.code_ICAO}</span>
			</List.Item>
		</Modal.Body>
		<Modal.Footer>
			<Modal.Cancel on:Cancel={() => modal$.hide(id)} />
		</Modal.Footer>
	</Modal.Root>
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
			<Form.Root {id} action="?/update" method="POST" enctype="multipart/form-data" {enhance}>
				<Form.Item>
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
			<Form.Root {id} action="?/create" method="POST" enctype="multipart/form-data" {enhance}>
				<Form.Item>
					<Text id="name" name="name" label="Customer Name" bind:value={$form.name} error={$errors?.name} />
					<Text id="description" name="description" label="Customer Description" bind:value={$form.description} error={$errors?.description} />
					<File id="logo" name="logo" label="Customer Logo" />
					<Text id="code_IATA" name="code_IATA" label="IATA Code" bind:value={$form.code_IATA} error={$errors?.code_IATA} />
					<Text id="code_ICAO" name="code_ICAO" label="ICAO Code" bind:value={$form.code_ICAO} error={$errors?.code_ICAO} />
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
					<Text id="selectedRows" name="selectedRows" label="Selected Rows" required={true} value={$isConfirm.data} hidden />
				</Form.Item>
				<Form.Error error={$errors?.pocketbaseErrors} />
			</Form.Root>
		</Modal.Body>
		<Modal.Footer>
			<Button.Submit title="Confirm" formId={id} />
			<Modal.Cancel on:Cancel={() => modal$.hide(id)} />
		</Modal.Footer>
	</Modal.Root>
{/if}

<div class="manage-container">
	<div class="manage-l">
		<Board {totalCustomers} />
	</div>
	<div class="manage-r relative">
		<svelte:component
			this={Table}
			{dataTable}
			dataCol={tableConfig}
			{search}
			on:rowClick={handleRowClick}
			showCreateButton={data.user !== null ? true : false}
			showRowSelector={data.user !== null ? true : false}>
			<span slot="title" class="title">Customers</span>
			<span slot="description" class="text-xs">Customers that exist in the history of project</span>
		</svelte:component>
	</div>
</div>
