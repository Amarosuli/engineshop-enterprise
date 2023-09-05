<script>
	import { superForm } from 'sveltekit-superforms/client';
	import { invalidateAll } from '$app/navigation';

	import * as Modal from '$lib/components/commons/Modal';
	import * as List from '$lib/components/commons/List';
	import * as Form from '$lib/components/commons/Form';

	import { modal$ } from '$lib/utils/Stores';
	import { CommonHelpers } from '$lib/utils/CommonHelpers';
	import { Search, Table, Text, Btn, Button, Menu, Switch, Stat } from '$lib/components';

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

	let selectedRows = [];
	let hiddenColumns = [];
	let search = '';
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

		// TODO: export to excel or pdf
	}

	function toggleColumn() {
		let toggleElements = document.querySelectorAll('.toggle-column');
		let arrTemplate = [];
		toggleElements.forEach((e) => {
			!e.checked && arrTemplate.push(e.id);
		});

		hiddenColumns = arrTemplate;
	}

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
				<Btn title="Update" color="warning" hidden={data?.user !== null ? false : true} on:click={() => modal$.show('update', $isDetail?.data)} />
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
		</Stat.Root>
	</div>
	<div class="manage-r">
		<div class="manage-r-header relative">
			{#if $isDelete}
				<div class="absolute flex left-0 bottom-0 justify-center items-center mx-auto z-10 h-full bg-slate-100/80 backdrop-blur-sm shadow w-full py-7 px-7 space-x-3">
					<span>Delete {selectedRows.length} selected data?</span>
					<button class="px-4 py-1 bg-red-400 text-xs" on:click={() => modal$.show('confirm')}>Yes</button>
					<button class="px-4 py-1 bg-green-200 text-xs" on:click={handleReset}>Reset</button>
				</div>
			{/if}
			<div class="manage-r-title">
				<div class="flex flex-col">
					<span class="title">Engine Families</span>
					<span class="text-xs">Engine Family that categorized by it's type</span>
				</div>
				<div class="w-max">
					<Search bind:value={search} />
				</div>
			</div>
			<div class="manage-r-action">
				<div class="btn-group">
					<Btn title="Create" color="info" on:click={() => modal$.show('create', null)} hidden={data.user !== null ? false : true} />
					<Btn
						title="Refresh"
						on:click={() => {
							invalidateAll();
							loadingRefresh = true;
						}}>
						<i class="ri-refresh-line ri-1x text-white" />
					</Btn>
					<Menu title="Column">
						{#each dataCol as { accessor }}
							<Switch id={accessor} className="toggle-column" label={accessor} value={true} on:change={toggleColumn} />
						{/each}
					</Menu>
					<Btn title="Export" color="success" on:click={() => handleExport()} />
				</div>
			</div>
		</div>
		<div class="manage-r-content">
			<svelte:component this={Table} {dataTable} {dataCol} {search} on:rowClick={handleRowClick} bind:selectedRows bind:exportJSON bind:hiddenColumns bind:isRefresh={loadingRefresh} />
		</div>
	</div>
</div>
