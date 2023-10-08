<script>
	import { SuperTable } from '$lib/components/commons/Table/tableClass.js';
	import { writable } from 'svelte/store';
	import { Render, Subscribe } from 'svelte-headless-table';

	let data$ = new writable([
		{
			quantity: '',
			description: '',
			remark: ''
		}
	]);
	let dataCol = [
		{
			header: 'Quantity',
			accessor: 'quantity'
		},
		{
			header: 'Description',
			accessor: 'description'
		},
		{
			header: 'Remark',
			accessor: 'remark'
		}
	];
	const table = new SuperTable(data$, dataCol, { rowSelector: false, sort: false });
	let { headerRows: Hr, rows: Br, tableAttrs: T, tableBodyAttrs: B, pluginStates: Ps } = table.init;
</script>

<table {...$T}>
	<thead>
		{#each $Hr as row (row.id)}
			<Subscribe Ra={row.attrs()} let:Ra>
				<tr {...Ra}>
					{#each row.cells as col (col.id)}
						<Subscribe Ca={col.attrs()} let:Ca let:Cp>
							<th {...Ca} class="col-sort col-{col.id}" class:col-checkbox={col.id === 'selected'}>
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
				<!-- <tr {...Ra} on:click={(e) => rowClickEvent(e, row)} class:selected={Rp.select.selected}> -->
				<tr {...Ra} class:selected={Rp.select.selected}>
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
