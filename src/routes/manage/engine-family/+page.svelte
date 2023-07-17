<script>
	import { Modal, ModalWithDialog, Search, Menu, Table, Text } from '$lib/components';
	import { _modal, _modalShow, _modalHide, _row } from '$lib/utils/store';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data;
	const { form, errors, enhance } = superForm(data.form, {
		applyAction: false,
		onResult: async ({ result }) => {
			if (result.type === 'success') {
				window.location = '/manage/engine-family';
			}
		}
	});
	const { engineFamily } = data;
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
	let search = '';

	let handleReset = () => {
		let elements = document.querySelectorAll('[data-isChecked]');
		elements.forEach((el) => {
			// el.getAttribute('dataset-isChecked') === 'true'
			if (el.dataset.ischecked === 'true') {
				el.click();
			}
		});
	};

	// NOTE : esc pressed need to fix due to all modal will be closed when triggered
</script>

<svelte:head>
	<title>Manage - Engine List</title>
</svelte:head>

{#if $_modal.find(({ id }) => id === 'detail')}
	<Modal id="detail" position="right">
		<div class="modal-container">
			<div class="modal-header">
				<h1 class="modal-title">Detail Form</h1>
				<button class="px-3 py-2 bg-slate-600" on:click={() => _modalShow('edit')}>Edit</button>
			</div>
			<div class="modal-content">
				<p class="font-semibold flex justify-between py-3 px-3 border-b">Family Name: <span class="font-bold">{$_row?.original?.name}</span></p>
				<p class="font-semibold flex justify-between py-3 px-3 border-b">Description: <span class="font-bold">{$_row?.original?.description}</span></p>
			</div>
		</div>
	</Modal>
{/if}

{#if $_modal.find(({ id }) => id === 'edit')}
	<Modal id="edit" position="right">
		<div class="modal-container">
			<div class="modal-header">
				<h1 class="modal-title">Edit Form</h1>
			</div>
			<div class="modal-content">
				<form action="?/edit" method="POST" class="space-y-3 mx-2">
					<Text id="name" name="name" label="Family Name" bind:value={$_row.original.name} />
					<Text id="description" name="description" label="Family Description" bind:value={$_row.original.description} />
					<button type="submit" class="flex mx-auto px-3 py-2 bg-orange-400">Update</button>
				</form>
			</div>
		</div>
	</Modal>
{/if}

{#if $_modal.find(({ id }) => id === 'create')}
	<Modal id="create" position="right">
		<div class="modal-container">
			<div class="modal-header">
				<h1 class="modal-title">Create Form</h1>
			</div>
			<div class="modal-content">
				<form action="?/create" method="POST" class="space-y-3 mx-2" use:enhance>
					<Text id="name" name="name" label="Family Name" bind:value={$form.name} error={$errors.name} />
					<Text id="description" name="description" label="Family Description" bind:value={$form.description} error={$errors.description} />
					<button type="submit" class="flex mx-auto px-3 py-2 bg-orange-400">Create</button>
					{#if $errors.pocketbaseErrors}
						<span class="italic text-xs py-2 text-center bg-yellow-200">{$errors.pocketbaseErrors}</span>
					{/if}
				</form>
			</div>
		</div>
	</Modal>
{/if}

{#if $_modal.find(({ id }) => id === 'delete')}
	<!-- <Modal id="delete" position="mid">Content</Modal> -->
	<div class="absolute flex right-0 bottom-10 justify-center items-center mx-auto z-20 h-max bg-orange-200 shadow w-max py-3 pl-6 pr-3 space-x-3">
		<span>Delete selected data?</span>
		<button class="px-4 py-1 bg-red-400 text-xs" on:click={() => _modalShow('confirm')}>Yes</button>
		<button class="px-4 py-1 bg-green-200 text-xs" on:click={handleReset}>Reset</button>
	</div>
{/if}

{#if $_modal.find(({ id }) => id === 'confirm')}
	<ModalWithDialog id="confirm">
		<div class="modal-container">
			<div class="modal-header">
				<h1 class="modal-title">Are you sure ?</h1>
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
			<div class="modal-content" />
		</div>
	</ModalWithDialog>
{/if}

<div class="relative p-2 xl:p-6 h-full w-full mx-auto flex flex-col xl:flex-row justify-start items-start xl:space-x-6 xl:space-y-0 space-y-2">
	<!-- <div class="w-full xl:w-[300px] h-32 bg-sky-300 p-4">left</div> -->
	<div class="w-full h-full flex flex-col">
		<div class="tableHead px-6 pt-4 pb-6 bg-slate-200">
			<span class="text-xl font-extrabold tracking-wide text-slate-600">Engine Families</span>
			<div class="flex justify-between">
				<div class="w-1/2 xl:w-[400px]">
					<Search bind:value={search} />
				</div>
				<div class="flex gap-3">
					<button class="p-2 h-max bg-slate-400" on:click={() => _modalShow('create')}>Create</button>
					<Menu title="Export" />
				</div>
			</div>
		</div>
		<div class="h-full overflow-auto">
			<!-- <Table dataTable={engineFamily} {dataCol} /> -->
			<svelte:component this={Table} dataTable={engineFamily} {dataCol} {search} bind:selectedRows />
		</div>
	</div>
</div>
