<script>
	import { readable } from 'svelte/store';
	import { _modalShow, _rowSet } from '$lib/utils/store';
	import { Render, Subscribe, createTable, createRender } from 'svelte-headless-table';
	import { addSortBy, addTableFilter, addSelectedRows, addHiddenColumns, addDataExport } from 'svelte-headless-table/plugins';
	import '$lib/scss/_table.scss';
	import SelectCell from './selectCell.svelte';

	export let dataTable = [];
	export let dataCol = [];

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

	let sortFn = (col) => {
		if ($sortKeys[0] == undefined) {
			return '';
		}
		if ($sortKeys[0].order === 'asc' && $sortKeys[0].id == col.id) {
			return 'sort-asc sort-active';
		} else if ($sortKeys[0].order === 'desc' && $sortKeys[0].id == col.id) {
			return 'sort-desc sort-active';
		} else {
			return '';
		}
	};

	const handleClick = (row) => {
		_rowSet(row); // set data from clicked row
		_modalShow('detail'); // show modal detail

		console.log(row);
		// console.log($selectedDataIds);
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
							<th {...Ca} on:click={Cp.sort.toggle} class={`col-sort ${sortFn(col)}`}>
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
				<tr {...Ra} on:click={() => handleClick(row)}>
					{#each row.cells as col (col.id)}
						<Subscribe Ca={col.attrs()} let:Ca>
							<td {...Ca}>
								<span class={col.id === 'selected' ? 'col-checkbox' : ''}>
									<Render of={col.render()} />
								</span>
							</td>
						</Subscribe>
					{/each}
				</tr>
			</Subscribe>
		{/each}
	</tbody>
</table>

<style lang="scss">
	table {
		@apply w-full bg-slate-50;

		td,
		th {
			@apply relative border-b border-solid px-[5px] py-[10px] text-left align-middle text-[0.65rem] outline-none md:text-xs;
			&:first-child {
				@apply w-1 pl-[20px];
			}
			&:last-child {
				@apply pr-[20px];
			}
		}
		th {
			@apply h-12 select-none bg-slate-200 px-2 text-[0.65rem] font-semibold hover:bg-slate-300 md:text-xs;
		}
		td {
			@apply h-14 break-words;
		}

		.col-checkbox {
			@apply w-1 px-[20px];
		}

		.col-checkbox > input {
			@apply cursor-pointer accent-amber-200;
		}
		.col-number {
			@apply w-1 p-[20px];
		}
		.col-sort {
			$pos: 10px;
			$iconSize: 25px;
			padding-right: $iconSize + $pos - 5;
			cursor: pointer;

			&:after {
				content: '\2191';
				position: absolute;
				right: 15px;
				top: 50%;
				margin-top: -($iconSize * 0.5);
				line-height: $iconSize;
				height: $iconSize;
				font-weight: normal;
				opacity: 0;
			}
			&.sort-desc:after {
				content: '\2191';
			}
			&.sort-asc:after {
				content: '\2193';
			}
			&.sort-active {
				&:after {
					opacity: 1;
				}
			}
		}

		thead {
			// @apply bg-slate-200;

			th {
				@apply sticky top-0 z-10;
			}
			tr {
				@apply outline-none;
			}
		}

		tbody {
			@apply h-[600px] overflow-y-hidden;

			tr {
				@apply cursor-pointer select-none hover:bg-slate-100;
			}
		}
	}
</style>
