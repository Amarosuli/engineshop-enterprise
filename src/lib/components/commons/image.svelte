<script>
	import { onMount } from 'svelte';

	export let src = '';
	export let alt = 'alt';
	export let crossorigin = 'anonymous';
	export let className = 'imgIcon';

	let loaded = false;
	let failed = false;
	let loading = false;

	onMount(() => {
		const img = new Image();
		img.src = src;
		loading = true;

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
	<img src="https://c.tenor.com/On7kvXhzml4AAAAi/loading-gif.gif" alt="loading.." {crossorigin} class={`${className}`} />
{/if}

<style>
	.imgIcon {
		@apply h-10 w-10 border-2 border-slate-700;
	}
</style>
