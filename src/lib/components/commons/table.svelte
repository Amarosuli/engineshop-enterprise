<script>
	import { readable } from 'svelte/store';
	import { Render, Subscribe, createTable } from 'svelte-headless-table';
	import { addSortBy, addTableFilter } from 'svelte-headless-table/plugins';

	export let gado;
	const data = readable([
		{ name: 'Iman', age: 21 },
		{ name: 'Sulif', age: 34 },
		{ name: 'Joko', age: 23 }
	]);

	class Toblo {
		cols = [];
		constructor(data, colArray) {
			this.table = createTable(data, {
				sort: addSortBy({ disableMultiSort: false }),
				tableFilter: addTableFilter()
			});
			this.createColsArray(colArray);
			this.init = this.table.createViewModel(this.table.createColumns(this.cols));
			this.plugin = this.init.pluginStates;
		}

		createColsArray = (colArray) => {
			colArray.forEach((v, index) => {
				v = { ...v, plugins: { sort: { invert: true }, tableFilter: { excludde: false } } };
				// this.cols[index] = this.table.column(v); normal
				this.cols[index] = this.table.column(v); // with sort
			});
		};
	}

	const tableCol = [
		{
			header: 'Name',
			accessor: 'name'
		},
		{
			header: 'Age',
			accessor: 'age'
		}
	];

	const { headerRows: Hr, rows: Br, tableAttrs: T, tableBodyAttrs: B } = new Toblo(data, tableCol).init;
	const { filterValue } = new Toblo(data, tableCol).plugin.tableFilter;

	$: gado = $filterValue;
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
							<th {...Ca} on:click={Cp.sort.toggle}>
								<Render of={col.render()} />
								{#if Cp.sort.order === 'asc'}
									⬇️
								{:else if Cp.sort.order === 'desc'}
									⬆️
								{/if}
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
				<tr {...Ra}>
					{#each row.cells as col (col.id)}
						<Subscribe Ca={col.attrs()} let:Ca>
							<td {...Ca}>
								<Render of={col.render()} />
							</td>
						</Subscribe>
					{/each}
				</tr>
			</Subscribe>
		{/each}
	</tbody>
</table>
