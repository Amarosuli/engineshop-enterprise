<script>
	import { readable } from 'svelte/store';
	import { _modalShow, _modalHide, _rowSet, _setSelectedRows } from '$lib/utils/store';
	import { Render, Subscribe, createTable, createRender } from 'svelte-headless-table';
	import { addSortBy, addTableFilter, addSelectedRows, addHiddenColumns, addDataExport } from 'svelte-headless-table/plugins';

	import SelectCell from './selectCell.svelte';

	export let dataTable = [];
	export let dataCol = [];
	export let search = '';
	export let selectedRows = [];

	const data = readable(dataTable);

	class SuperTable {
		cols = [];

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
			const ColSelect = {
				id: 'selected',
				header: ({ row }, { pluginStates }) => {
					const { allRowsSelected } = pluginStates.select;
					return createRender(SelectCell, { isSelected: allRowsSelected });
				},
				cell: ({ row }, { pluginStates }) => {
					const { isSelected } = pluginStates.select.getRowState(row);
					return createRender(SelectCell, { isSelected });
				}
			};
			const ColOrder = {
				id: 'order',
				header: 'No',
				cell: ({ row }) => {
					let rowNumber = parseInt(row.id) + 1;
					return rowNumber;
				},
				plugins: {
					sort: { invert: true }
				}
			};

			colArray.forEach((v, index) => {
				v = { ...v, plugins: plugin };
				this.cols[index] = this.table.column(v);
			});
			this.cols.unshift(this.table.column(ColOrder));
			this.cols.unshift(this.table.display(ColSelect));
		};
	}

	const table = new SuperTable(data, dataCol);
	const { headerRows: Hr, rows: Br, tableAttrs: T, tableBodyAttrs: B } = table.init;
	const { filterValue } = table.plugin.tableFilter;
	const { sortKeys } = table.plugin.sort; // currently not used
	let { selectedDataIds, allRowsSelected, someRowsSelected } = table.plugin.select;

	$: $filterValue = search; // binding with the search value
	$: selectedRows = $Br.filter((value, index) => {
		if ($selectedDataIds[index]) {
			// return if only id is true
			return value;
		}
	}); // binding with the selectedRows value

	// NOTE: need to make reset selected rows from parent, from state of someRowsSelected
	// RESOLVE: someRowsSelected is Readable not Writable. Cant use this

	const handleClick = (event, row) => {
		if (event.target.getAttribute('data-row')) {
			_rowSet(row); // set data from clicked row
			_modalShow('detail'); // show modal detail
		}
	};

	$: Object.keys($selectedDataIds).length !== 0 ? _modalShow('delete') : _modalHide('delete');
</script>

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
							<th {...Ca} on:click={Cp.sort.toggle} class="col-sort" class:col-checkbox={col.id === 'selected'} class:sort-active={Cp.sort.order !== undefined} class:sort-asc={Cp.sort.order === 'asc'} class:sort-desc={Cp.sort.order === 'desc'}>
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
				<tr {...Ra} on:click={(e) => handleClick(e, row)} class:selected={Rp.select.selected}>
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
