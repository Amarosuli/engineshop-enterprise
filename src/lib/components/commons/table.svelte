<script>
	import { modal$ } from '$lib/utils/Stores';
	import { writable } from 'svelte/store';
	import { Render, Subscribe, createTable, createRender } from 'svelte-headless-table';
	import { addSortBy, addTableFilter, addSelectedRows, addHiddenColumns, addDataExport } from 'svelte-headless-table/plugins';

	import { createEventDispatcher } from 'svelte';
	import { CommonHelpers } from '$lib/utils/CommonHelpers';

	import SelectCell from './selectCell.svelte';
	import ImageCell from './imageCell.svelte';

	export let dataTable = [];
	export let dataCol = [];
	export let search = '';
	export let selectedRows = [];
	export let exportJSON = '';
	export let hiddenColumns = [];

	const { isDelete, show } = modal$;
	const dispatch = createEventDispatcher();

	class SuperTable {
		cols = [];
		rowNumber = 0;

		constructor(data, colArray) {
			this.table = createTable(data, {
				sort: addSortBy({ disableMultiSort: false }),
				tableFilter: addTableFilter(),
				select: addSelectedRows(),
				hidden: addHiddenColumns(),
				export: addDataExport()
			});
			this.plugins = {
				sort: { invert: true },
				tableFilter: { exclude: false }
			};
			this.createColsArray(colArray, this.plugins);
			this.init = this.table.createViewModel(this.table.createColumns(this.cols));
			this.plugin = this.init.pluginStates;
		}

		createColsArray = (colArray, plugin) => {
			/**
			 * define select column and it's plugin
			 */
			const ColSelect = {
				id: 'selected',
				header: ({ row }, { pluginStates }) => {
					const { allRowsSelected } = pluginStates.select;
					return createRender(SelectCell, { isSelected: allRowsSelected });
				},
				cell: ({ row }, { pluginStates }) => {
					const { isSelected } = pluginStates.select.getRowState(row);
					return createRender(SelectCell, { isSelected });
				},
				plugins: {
					export: { exclude: true }
				}
			};

			/**
			 * define order column, i'm sure there's feature to do this
			 * but i cant find it so i only knew this way (the sort plugin works).
			 */

			const ColOrder = {
				id: 'order',
				header: 'No',
				cell: ({ row }) => {
					return parseInt(row.id) + 1;
				},
				accessor: () => {
					return (this.rowNumber += 1);
				},
				plugins: {
					sort: { invert: true }
				}
			};

			/**
			 * check if there's image to display
			 * so we add costum createRender with ImageCell components
			 */
			colArray = colArray.map((v, index) => {
				if (v.isImage === true) {
					v.cell = ({ row }) => {
						let column = v.accessor;
						return createRender(ImageCell, { row, column });
					};
					return v;
				}
				return v;
			});

			/**
			 * recreate the array to include the plugin
			 * then creating table.column()
			 * only data that work with table.column
			 */
			colArray.forEach((v, index) => {
				v = { ...v, plugins: plugin };
				this.cols[index] = this.table.column(v);
			});

			/**
			 * add the select column and order column with unshift
			 * so the array will insert to the first index
			 */
			this.cols.unshift(this.table.column(ColOrder));
			this.cols.unshift(this.table.display(ColSelect));
			this.rowNumber = 0;
		};
	}

	let data$ = writable([]);
	$: $data$ = dataTable;

	const table = new SuperTable(data$, dataCol);
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
</script>

<svelte:window on:keydown={escHandler} />

<!-- 
   T -- Table
   B -- Table Body
   Hr -- Header Rows
   Br -- Body Rows
   Ra -- Row Attributes
   Cp -- Col Props
   Ca -- Col Attributes
 -->

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
								class="col-sort"
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
	</tbody>
</table>
{#if lengthOfRow}
	<div class="w-full flex flex-col justify-center items-center py-6 gap-3">
		<span class="text-center font-bold tracking-wide"> No Data Found </span>
		<button class="text-center tracking-wide px-3 py-2 bg-slate-200 hover:bg-slate-300 shadow" on:click={() => show('create')}> Create a new one </button>
	</div>
{/if}
