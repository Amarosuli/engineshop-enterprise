<script>
	import { superForm } from 'sveltekit-superforms/client';
	import { invalidateAll } from '$app/navigation';

	import { modal$ } from '$lib/utils/Stores';
	import { CommonHelpers } from '$lib/utils/CommonHelpers';
	import { Search, Table, Text, Btn, Button, Menu, Switch, Modal, List, Form, Stat } from '$lib/components';

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

	let dataTable;
	let loadingRefresh = false;
	let totalFamily = data.engineFamily.length;

	$: (dataTable = data.engineFamily), (loadingRefresh = false);

	const { isConfirm, isDelete, isUpdate, isCreate, isDetail } = modal$;

	const dataCol = [
		{
			header: 'Name',
			accessor: 'name'
		},
		{
			header: 'Description',
			accessor: 'description'
		}
	];

	let search = '';
	function handleRowClick(e) {
		let rowData = e.detail.rowData.original;
		modal$.show('detail', rowData);
	}

	function setUpdate(isTrue) {
		isTrue ? CommonHelpers.mergeObject($form, $isUpdate.data) : CommonHelpers.resetObject($form);
	}

	$: $isUpdate ? setUpdate(1) : '';
	$: $isCreate ? setUpdate(0) : '';
</script>

<svelte:head>
	<title>Manage : Engine Family</title>
</svelte:head>

{#if $isDetail}
	<Modal.Root let:id id="detail" position="right">
		<Modal.Header>
			<Modal.Title title="Detail Form" />
			<Modal.Action>
				<Btn title="Update" color="warning" hidden={data?.user !== null ? false : true} on:click={() => modal$.show('update', $isDetail?.data)}><i class="ri-pencil-line ri-1x text-white" /></Btn>
				<Modal.Close on:Close={() => modal$.hide(id)} />
			</Modal.Action>
		</Modal.Header>
		<Modal.Body>
			<List.Item>
				<span>Family Name</span>
				<span class="font-bold text-right">{$isDetail.data?.name}</span>
			</List.Item>
			<List.Item>
				<span>Description</span>
				<span class="font-bold text-right">{$isDetail.data?.description}</span>
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
			<Form.Root {id} action="?/update" method="POST" {enhance}>
				<Form.Item>
					<Text id="id" name="id" bind:value={$isUpdate.data.id} hidden />
					<Text id="name" name="name" label="Family Name" bind:value={$form.name} error={$errors.name} />
					<Text id="description" name="description" label="Family Description" bind:value={$form.description} error={$errors.description} />
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
					<Text id="name" name="name" label="Family Name" bind:value={$form.name} error={$errors?.name} />
					<Text id="description" name="description" label="Family Description" bind:value={$form.description} error={$errors?.description} />
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
			<Stat.Title title="Total Family" />
			<Stat.Value value="{totalFamily} EA" />
			<Stat.Desc desc="Engine Family are categorize by it's Type." />
			<svelte:fragment slot="icon">
				<i class="hidden lg:block ri-parent-fill ri-3x text-indigo-600" />
			</svelte:fragment>
		</Stat.Root>
	</div>
	<div class="manage-r relative">
		<svelte:component this={Table} {dataTable} {dataCol} {search} on:rowClick={handleRowClick} showCreateButton={data.user !== null ? true : false} showRowSelector={data.user !== null ? true : false}>
			<span slot="title" class="title">Engine Families</span>
			<span slot="description" class="text-xs">Engine Family that categorized by it's type</span>
		</svelte:component>
	</div>
</div>
