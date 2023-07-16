<script>
	import { Modal, ModalWithDialog, Search, Menu, Table } from '$lib/components';
	import { _modal, _modalShow, _row } from '$lib/utils/store';

	export let data;
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

	// NOTE : esc pressed need to fix due to all modal will be closed when triggered
</script>

<svelte:head>
	<title>Manage - Engine List</title>
</svelte:head>

{#if $_modal.find(({ id }) => id === 'detail')}
	<Modal id="detail" position="right">
		<div class="w-full flex flex-col items-center justify-center mt-4 px-4">
			<div class="w-full flex justify-between items-center px-3">
				<h1 class="text-lg font-extrabold border-b border-dashed border-slate-700 py-2">Detail Form</h1>
				<button class="px-3 py-2 bg-slate-600" on:click={() => _modalShow('edit')}>Edit</button>
			</div>
			<div class="mx-2 w-full flex flex-col mt-4">
				<p class="font-semibold flex justify-between py-2 px-3 border-b">Family Name: <span class="font-bold">{$_row?.original.name}</span></p>
				<p class="font-semibold flex justify-between py-2 px-3 border-b">Description: <span class="font-bold">{$_row?.original.description}</span></p>
			</div>
		</div>
	</Modal>
{/if}

{#if $_modal.find(({ id }) => id === 'edit')}
	<Modal id="edit" position="right">Content</Modal>
{/if}
{#if $_modal.find(({ id }) => id === 'create')}
	<Modal id="create" position="right">Content</Modal>
{/if}
{#if $_modal.find(({ id }) => id === 'delete')}
	<Modal id="edit" position="center">Content</Modal>
{/if}

<!-- <ModalWithDialog /> -->

<div class="relative p-2 xl:p-6 h-full w-full bg-slate-200 mx-auto flex flex-col xl:flex-row justify-start items-start xl:space-x-6 xl:space-y-0 space-y-2">
	<!-- <div class="w-full xl:w-[300px] h-32 bg-sky-300 p-4">left</div> -->

	<div class="w-full h-full flex flex-col bg-white">
		<div class="tableHead bg-sky-200 px-4 pt-4 pb-6">
			<span class="text-xl font-extrabold tracking-wide text-slate-700">Engine List</span>
			<div class="flex justify-between">
				<div class="w-1/2 xl:w-[400px]">
					<Search />
				</div>
				<Menu title="Export" />
			</div>
		</div>
		<div class="h-full overflow-auto">
			<Table dataTable={engineFamily} {dataCol} />
		</div>
	</div>
</div>
