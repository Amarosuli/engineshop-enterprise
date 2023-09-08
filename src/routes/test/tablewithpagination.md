```svelte
<script>
	import { onMount } from 'svelte';
	import { Table, Button } from '$lib/components';

	let dataTable;
	let allData;
	let page;
	let totalPages;

	let selectedRows = [];
	let search = '';
	let exportJSON;
	let hiddenColumns = [];
	let loadingRefresh = false;

	$: page = allData?.customers?.page || 1;
	$: totalPages = allData?.customers?.totalPages || 1;

	const dataCol = [
		{
			header: 'Name',
			accessor: 'name'
		},
		{
			header: 'Description',
			accessor: 'description'
		},
		{
			header: 'Logo',
			accessor: 'logo',
			isImage: true
		},
		{
			header: 'IATA',
			accessor: 'code_IATA'
		},
		{
			header: 'ICAO',
			accessor: 'code_ICAO'
		}
	];

	async function fetchData(_page, _perpage) {
		let perpage = _perpage || 10;
		let page = _page || 1;

		loadingRefresh = true;
		let res = await fetch(`/api/engine-preservation?page=${page}&perpage=${perpage}`);
		let final = await res.json();
		console.log(final);

		allData = await final;
		dataTable = await final.customers.items;
		loadingRefresh = false;
	}

	onMount(async () => {
		fetchData();
	});
	// $: console.log(dataTable);
</script>

<svelte:component this={Table} bind:dataTable {dataCol} {search} bind:selectedRows bind:exportJSON bind:hiddenColumns bind:isRefresh={loadingRefresh} />

<div class="flex w-full justify-center items-center py-4 px-8">
	<Button.Event title="Prev" disabled={page === 1} on:Event={() => fetchData(page - 1)} />
	<p>{page} of {totalPages}</p>
	<Button.Event title="Next" disabled={page === totalPages} on:Event={() => fetchData(page + 1)} />
</div>

```
