<script>
	import { Table, Text, Btn, Button, Stat, Select, Modal, List, Form, Password } from '$lib/components';
	import { CommonHelpers, modal$ } from '$lib/utils';
	import { invalidateAll } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	let search = '';
	let dataTable;
	let totalModels = data.engineModels.length;

	const { engineFamilies } = data;
	const familyOptions = engineFamilies.map(({ id, name }) => ({ value: id, title: name }));
	const { isConfirm, isDelete, isUpdate, isCreate, isDetail } = modal$;
	const { form, errors, enhance } = superForm(data.form, {
		applyAction: false,
		taintedMessage: null,
		resetForm: true,
		onUpdate: ({ form }) => {
			if (form.valid) {
				invalidateAll();
				modal$.reset();
				console.log('show pop up success');
			}
		},
		onResult: ({ result, cancel }) => {
			if (result.type === 'success' && result.data.form.errors.pocketbaseErrors) {
				console.log('show pop up failure');
				cancel(); // prevent onUpdate to run
			}
		},
		onError: async (a) => {
			console.log(a);
		}
	});

	function handleRowClick(e) {
		let rowData = e.detail.rowData.original;
		modal$.show('detail', rowData);
	}

	function setUpdate(isTrue) {
		isTrue ? CommonHelpers.mergeObject($form, $isUpdate.data) : CommonHelpers.resetObject($form);
	}

	$: dataTable = data.engineModels;
	$: $isUpdate ? setUpdate(1) : '';
	$: $isCreate ? setUpdate(0) : '';
</script>

<svelte:head>
	<title>Manage : Engine Models</title>
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
				<span>Model Name</span>
				<span class="text-right font-bold">{$isDetail.data?.name}</span>
			</List.Item>
			<List.Item>
				<span>Description</span>
				<span class="text-right font-bold">{$isDetail.data?.description}</span>
			</List.Item>
			<List.Item>
				<span>Family</span>
				<span class="text-right font-bold">{$isDetail.data?.family}</span>
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
					<Text id="name" name="name" label="Modal Name" bind:value={$form.name} error={$errors.name} />
					<Text id="description" name="description" label="Modal Description" bind:value={$form.description} error={$errors.description} />
					<Select id="family_id" name="family_id" label="Family" options={familyOptions} bind:value={$form.family_id} error={$errors.family_id} />
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
					<Select id="family_id" name="family_id" label="Family" options={familyOptions} bind:value={$form.family_id} error={$errors.family_id} />
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
		<Stat.Root>
			<Stat.Title title="Total Models" />
			<Stat.Value value="{totalModels} EA" />
			<Stat.Desc desc="Engine Models are categorize by it's Generation." />
			<svelte:fragment slot="icon">
				<i class="ri-spy-fill ri-3x hidden text-indigo-600 lg:block" />
			</svelte:fragment>
		</Stat.Root>
	</div>
	<div class="manage-r relative">
		<svelte:component
			this={Table}
			{dataTable}
			dataCol={CommonHelpers.tableColumn.engineModel}
			{search}
			on:rowClick={handleRowClick}
			showCreateButton={data.user !== null ? true : false}
			showRowSelector={data.user !== null ? true : false}>
			<span slot="title" class="title">Engine Models</span>
			<span slot="description" class="text-xs">Engine Models that categorized by it's generation</span>
		</svelte:component>
	</div>
</div>
