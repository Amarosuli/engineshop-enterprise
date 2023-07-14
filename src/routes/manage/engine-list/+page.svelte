<script>
	import { Modal, ModalWithDialog, Search, Menu, Table } from '$lib/components';
	import { _modal, _row } from '$lib/utils/store';

	const dataTable = [
		{ name: 'Iman', age: 21, gender: 'men', religious: 'islam' },
		{ name: 'Sulif', age: 34, gender: 'men', religious: 'islam' },
		{ name: 'Sulif', age: 34, gender: 'men', religious: 'islam' },
		{ name: 'Sulif', age: 34, gender: 'men', religious: 'islam' },
		{ name: 'Sulif', age: 34, gender: 'men', religious: 'islam' }
	];

	const dataCol = [
		{
			header: 'Name',
			accessor: 'name'
		},
		{
			header: 'Age',
			accessor: 'age'
		},
		{
			header: 'Gender',
			accessor: 'gender'
		},
		{
			header: 'Religious',
			accessor: 'religious'
		}
	];
</script>

<svelte:head>
	<title>Manage - Engine List</title>
</svelte:head>

{#if $_modal.find(({ id }) => id === 'detail')}
	<Modal id="detail" position="right">Content</Modal>
{/if}
{#if $_modal.find(({ id }) => id === 'create')}
	<Modal id="create" position="right">Content</Modal>
{/if}
{#if $_modal.find(({ id }) => id === 'edit')}
	<Modal id="edit" position="right">Content</Modal>
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
			<Table {dataTable} {dataCol} />
		</div>
	</div>
</div>
