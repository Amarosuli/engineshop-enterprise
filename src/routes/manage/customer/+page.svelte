<script>
	import { superForm } from 'sveltekit-superforms/client';
	import { invalidateAll } from '$app/navigation';

	import { modal$ } from '$lib/utils/Stores';
	import { CommonHelpers } from '$lib/utils/CommonHelpers';
	import { File, Table, Text, Btn, Button, Img, Modal, List, Form } from '$lib/components';
	import { tableConfig } from './config.js';
	import Board from './board.svelte';

	export let data;
	let search = '';
	let dataTable;
	let loadingRefresh = true;
	// let { customers } = data; DESCTRUCTURING MAKES INVALIDATEALL NOT WORKING
	$: dataTable = data.customers;

	/**
	 * destructure of modal costum store
	 * make using method more simpler
	 */
	const { isConfirm, isDelete, isUpdate, isCreate, isDetail } = modal$;

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
				loadingRefresh = true;
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
				<Btn title="Update" color="warning" hidden={data?.user !== null ? false : true} on:click={() => modal$.show('update', $isDetail?.data)} />
				<Modal.Close on:Close={() => modal$.hide(id)} />
			</Modal.Action>
		</Modal.Header>
		<Modal.Body>
			<List.Item>
				<span>Logo</span>
				<span class="w-full flex justify-end">
					<Img
						className="object-scale-down h-10 "
						src={$isDetail?.data?.logo ? CommonHelpers.getFileUrl($isDetail?.data?.collectionId, $isDetail?.data?.id, $isDetail?.data?.logo) : '/'}
						alt={$isDetail?.data?.logo}
						crossorigin="anonymous" />
				</span>
			</List.Item>
			<List.Item>
				<span>Customer Name</span>
				<span class="font-bold text-right">{$isDetail.data?.name}</span>
			</List.Item>
			<List.Item>
				<span>Description</span>
				<span class="font-bold text-right">{$isDetail.data?.description}</span>
			</List.Item>
			<List.Item>
				<span>IATA Code</span>
				<span class="font-bold text-right">{$isDetail.data?.code_IATA}</span>
			</List.Item>
			<List.Item>
				<span>ICAO Code</span>
				<span class="font-bold text-right">{$isDetail.data?.code_ICAO}</span>
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
	<Modal.Root let:id id="confirm" position="mid">
		<Modal.Header>
			<Modal.Title title="Are you sure?" />
			<Modal.Action>
				<Modal.Close on:Close={() => modal$.hide(id)} />
			</Modal.Action>
		</Modal.Header>
		<Modal.Body />
		<Modal.Footer>
			<Modal.Confirm on:Confirm={() => modal$.hide(id)} />
			<Modal.Cancel on:Cancel={() => modal$.hide(id)} />
		</Modal.Footer>
	</Modal.Root>
{/if}

<div class="manage-container">
	<div class="manage-l">
		<Board {totalCustomers} />
	</div>
	<div class="manage-r relative">
		<svelte:component this={Table} {dataTable} dataCol={tableConfig} {search} on:rowClick={handleRowClick} showCreateButton={data.user !== null ? true : false}>
			<span slot="title" class="title">Customers</span>
			<span slot="description" class="text-xs">Customers that exist in the history of project</span>
		</svelte:component>
	</div>
</div>
