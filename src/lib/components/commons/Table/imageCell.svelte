<script>
	import { onMount } from 'svelte';
	import { CommonHelpers } from '$lib/utils/CommonHelpers';

	export let row;
	export let column;
	export let alt = 'alt';
	export let crossorigin = 'anonymous';
	export let className = 'w-8 object-contain';

	let src = '';
	let loaded = false;
	let failed = false;
	let loading = false;

	onMount(() => {
		/** @TODO image not shown in mobile devices
		 * it was not my code, it was the pocketbase use localhost
		 * and it's not opened
		 */
		const img = new Image();
		if (row.original?.[column]) {
			src = CommonHelpers.getFileUrl(row.original?.collectionId, row.original?.id, row.original?.[column]);
			img.src = src;
			loading = true;
		}

		img.onload = () => {
			loading = false;
			loaded = true;
		};

		img.onerror = () => {
			loading = false;
			failed = true;
		};
	});
</script>

{#if loaded}
	<img {src} {alt} {crossorigin} class={`${className}`} />
{:else if failed}
	<img src="https://icon-library.com/images/not-found-icon/not-found-icon-20.jpg" alt="Not Found" class={`${className}`} />
{:else if loading}
	<img src="https://c.tenor.com/On7kvXhzml4AAAAi/loading-gif.gif" alt="loading.." class={`${className}`} />
{/if}

<style>
	.imgIcon {
		@apply h-10 w-10 border-2 border-slate-700;
	}
</style>
