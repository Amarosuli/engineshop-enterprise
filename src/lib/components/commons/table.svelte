<script>
	import { readable } from 'svelte/store';
	import { _modalShow, _rowSet } from '$lib/utils/store';
	import { Render, Subscribe, createTable, createRender } from 'svelte-headless-table';
	import { addSortBy, addTableFilter, addSelectedRows, addHiddenColumns, addDataExport } from 'svelte-headless-table/plugins';

	import SelectCell from './selectCell.svelte';

	export let dataTable = [];
	export let dataCol = [];
	export let search = '';

	const data = readable(dataTable);

	class SuperTable {
		cols = [];

		constructor(data, colArray) {
			this.table = createTable(data, {
				sort: addSortBy({ disableMultiSort: false }),
				tableFilter: addTableFilter(),
				selected: addSelectedRows(),
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
				header: '',
				cell: ({ row }, { pluginStates }) => {
					const { isSelected } = pluginStates.selected.getRowState(row);
					return createRender(SelectCell, {
						isSelected
					});
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
	const { sortKeys } = table.plugin.sort;
	const { selectedDataIds } = table.plugin.selected;

	$: $filterValue = search; // binding with the search value
	$: console.log($selectedDataIds);
	let sortClass = '';
	let sortId = '';
	let sortFn = (col) => {
		if ($sortKeys.length === 1) {
			if ($sortKeys[0].order === 'asc' && $sortKeys[0].id == col.id) {
				sortClass = 'sort-asc sort-active';
				sortId = col.id;
			} else if ($sortKeys[0].order === 'desc' && $sortKeys[0].id == col.id) {
				sortClass = 'sort-desc sort-active';
				sortId = col.id;
			} else {
				sortClass = '';
			}
		} else {
			sortClass = '';
		}
	};

	const handleClick = (event, row) => {
		if (event.target.getAttribute('data-row')) {
			_rowSet(row); // set data from clicked row
			_modalShow('detail'); // show modal detail
		}
	};

	const handleSelect = (e) => {
		// show modal / notif delete with list of selected id
		_modalShow('delete');
	};
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
							<th {...Ca} on:click={Cp.sort.toggle} on:click={() => sortFn(col)} class={`col-sort ${sortId === col.id ? sortClass : ''}`}>
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
			<Subscribe Ra={row.attrs()} let:Ra>
				<tr {...Ra} on:click={(e) => handleClick(e, row)}>
					{#each row.cells as col (col.id)}
						<Subscribe Ca={col.attrs()} let:Ca>
							<td {...Ca} data-row={true}>
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<!-- svelte-ignore a11y-no-static-element-interactions -->
								{#if col.id === 'selected'}
									<span on:click={handleSelect} class={`${col.id === 'selected' ? 'col-checkbox' : ''}`}>
										<Render of={col.render()} />
									</span>
								{:else}
									<Render of={col.render()} />
								{/if}
							</td>
						</Subscribe>
					{/each}
				</tr>
			</Subscribe>
		{/each}
	</tbody>
</table>
