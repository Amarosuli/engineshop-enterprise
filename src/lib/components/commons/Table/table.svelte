<script>
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import { invalidateAll } from '$app/navigation';

	import { modal$ } from '$lib/utils/Stores';
	import { writable } from 'svelte/store';
	import { Render, Subscribe } from 'svelte-headless-table';
	import { Search, Button, Switch, Dropdown } from '$lib/components';
	import { SuperTable } from './tableClass';

	export let dataTable = [];
	export let dataCol = [];
	export let search = '';
	export let selectedRows = [];
	export let exportJSON = '';
	export let hiddenColumns = [];
	export let isRefresh = false;
	export let showCreateButton = false;
	export let showRowSelector = true;

	const { isDelete, show } = modal$;
	const dispatch = createEventDispatcher();

	let data$ = writable([]);
	$: ($data$ = dataTable), (isRefresh = false);

	const table = new SuperTable(data$, dataCol, { rowSelector: showRowSelector });
	let { headerRows: Hr, rows: Br, tableAttrs: T, tableBodyAttrs: B, pluginStates: Ps } = table.init;
	let { sortKeys } = Ps.sort; // currently not used
	let { filterValue } = Ps.tableFilter;
	let { exportedData } = Ps.export;
	let { hiddenColumnIds } = Ps.hidden;
	let { selectedDataIds, allRowsSelected, someRowsSelected } = Ps.select;

	$: exportJSON = $exportedData;
	$: $filterValue = search; // binding with the search value
	$: $hiddenColumnIds = hiddenColumns;
	$: selectedRows = $Br.filter((value, index) => {
		if ($selectedDataIds[index]) {
			// return if only id is true
			return value;
		}
	}); // binding with the selectedRows value

	// NOTE: need to make reset selected rows from parent, from state of someRowsSelected
	// RESOLVE: someRowsSelected is Readable not Writable. Cant use this

	function escHandler(e) {
		if (!e) {
			return;
		}

		if (e.keyCode === 27) {
			let modalNames = ['create', 'detail', 'update', 'confirm'];
			// maybe we can use pop function in store to hide modal one by one according to it's order
			if ($isDelete && $selectedDataIds) {
				modalNames.forEach((name) => {
					modal$.hide(name);
				});
				return;
			}
			modal$.reset(); // reset modal store
			// reset table row store
		}
	}

	$: Object.keys($selectedDataIds).length !== 0 ? modal$.show('delete') : modal$.hide('delete');

	$: lengthOfRow = $Br.length === 0;

	function rowClickEvent(e, rowData) {
		if (e.target.getAttribute('data-row')) {
			dispatch('rowClick', {
				rowData
			});
		}
	}

	function toggleColumn() {
		let toggleElements = document.querySelectorAll('.toggle-column');
		let arrTemplate = [];
		toggleElements.forEach((e) => {
			!e.checked && arrTemplate.push(e.id);
		});

		hiddenColumns = arrTemplate;
	}

	/**
	 * this is for reseting the selected table rows
	 * manually get the table checked box input
	 * then trigger click event to unchecked all checked input
	 */
	function handleReset() {
		let elements = document.querySelectorAll('[data-isChecked]');
		elements.forEach((el) => {
			// el.getAttribute('dataset-isChecked') === 'true' -- old
			if (el.dataset.ischecked === 'true') {
				el.click();
			}
		});
	}
	/**
	 * @TODO
	 * this is for handling export
	 * will have two format file on export (xlsx and pdf)
	 * both will use library that capable to use template
	 * for pdf file will be use the pdfme library
	 * for excel file will be use the js-excel-template
	 */
	function handleExport() {
		console.log(exportJSON);

		// TODO: export to excel or pdf
	}

	function handleRowClick(e) {
		let rowData = e.detail.rowData.original;
		modal$.show('detail', rowData);
	}
</script>

<svelte:window on:keydown={escHandler} />

{#if isRefresh}
	<div transition:fade={{ duration: 200 }} class="absolute z-50 justify-center backdrop-brightness-100 bg-slate-100/40 backdrop-blur-sm items-center flex gap-4 w-full h-full py-8 text-2xl font-bold">
		<svg role="status" class="inline -mt-px animate-spin dark:text-gray-600 fill-orange-600 w-8 text-slate-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
				fill="currentColor" />
			<path
				d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
				fill="currentFill" />
		</svg>
		<span class="text-slate-600 font-semibold text-sm">Refresh table . . .</span>
	</div>
{/if}

<div class="manage-r-header relative">
	{#if $isDelete}
		<div transition:fade={{ duration: 200 }} class="absolute flex left-0 bottom-0 justify-center items-center mx-auto z-10 h-full bg-slate-100/80 backdrop-blur-sm shadow w-full py-7 px-7 space-x-3">
			<span>Delete {selectedRows.length} selected data?</span>
			<button class="px-4 py-1 bg-red-400 text-xs" on:click={() => modal$.show('confirm', selectedRows)}>Yes</button>
			<button class="px-4 py-1 bg-green-200 text-xs" on:click={handleReset}>Reset</button>
		</div>
	{/if}
	<div class="manage-r-title self-center">
		<div class="flex flex-col">
			<slot name="title">
				<span class="title">Title</span>
			</slot>
			<slot name="description">
				<span class="text-xs">Description</span>
			</slot>
		</div>
		<div class="w-max">
			<Search bind:value={search} />
		</div>
	</div>

	<div class="manage-r-action items-end relative gap-3 flex-row xl:flex-col">
		<div class="btn-group">
			{#if showCreateButton}
				<Button.Event title="Create" classes="btn btn_info" on:Event={() => modal$.show('create', null)}><i class="ri-add-circle-line ri-1x" /></Button.Event>
			{/if}
			<Button.Event
				title="Refresh"
				classes="btn btn_base"
				on:Event={() => {
					invalidateAll();
					isRefresh = true;
				}}><i class="ri-refresh-line ri-1x text-white" /></Button.Event>
			<Dropdown.Root>
				<Dropdown.Trigger let:isOpen>Column</Dropdown.Trigger>
				<Dropdown.Content size="w-52">
					<div class="w-full p-2 space-y-2">
						{#each dataCol as { accessor, header }}
							<Switch id={accessor} className="toggle-column capitalize" label={header} value={true} on:change={toggleColumn} />
						{/each}
					</div>
				</Dropdown.Content>
			</Dropdown.Root>
			<Button.Event title="Export" classes="btn btn_success" on:Event={handleExport} />
		</div>
		<div class="btn-group">
			<slot name="action" />
		</div>
	</div>
</div>

<!-- 
   T -- Table
   B -- Table Body
   Hr -- Header Rows
   Br -- Body Rows
   Ra -- Row Attributes
   Cp -- Col Props
   Ca -- Col Attributes
 -->

<!-- THIS IS PLAN
   Table.Root
      Table.Header
         Grouper
            Table.Title
            Table.Description
            Table.search
         Grouper
         Table.Action
            Button.Group
               Button.Create
               Button.Refresh
               Button.Column
               Button.Export
            Button.Group
         Table.Action
      Table.Header
      Table.Main
   Table.Root
 -->
<div class="manage-r-content">
	<table {...$T}>
		<thead>
			{#each $Hr as row (row.id)}
				<Subscribe Ra={row.attrs()} let:Ra>
					<tr {...Ra}>
						{#each row.cells as col (col.id)}
							<Subscribe Ca={col.attrs()} Cp={col.props()} let:Ca let:Cp>
								<th
									{...Ca}
									on:click={Cp.sort.toggle}
									class="col-sort col-{col.id}"
									class:col-checkbox={col.id === 'selected'}
									class:sort-active={Cp.sort.order !== undefined}
									class:sort-asc={Cp.sort.order === 'asc'}
									class:sort-desc={Cp.sort.order === 'desc'}>
									<Render of={col.render()} />
								</th>
							</Subscribe>
						{/each}
					</tr>
				</Subscribe>
			{/each}
		</thead>
		<tbody {...$B}>
			{#if !isRefresh}
				{#each $Br as row (row.id)}
					<Subscribe Ra={row.attrs()} Rp={row.props()} let:Ra let:Rp>
						<!-- on:click={(e) => handleClick(e, row)} OLD -->
						<tr {...Ra} on:click={(e) => rowClickEvent(e, row)} class:selected={Rp.select.selected}>
							{#each row.cells as col (col.id)}
								<Subscribe Ca={col.attrs()} let:Ca>
									<td {...Ca} data-row={true} class="col-checkbox">
										<Render of={col.render()} />
									</td>
								</Subscribe>
							{/each}
						</tr>
					</Subscribe>
				{/each}
			{/if}
		</tbody>
	</table>

	{#if lengthOfRow}
		<div class="w-full flex flex-col justify-center items-center py-6 gap-3">
			<span class="text-center font-bold tracking-wide"> No Data Found </span>
			<button class="text-center tracking-wide px-3 py-2 bg-slate-200 hover:bg-slate-300 shadow" on:click={() => show('create')}> Create a new one </button>
		</div>
	{/if}
</div>
