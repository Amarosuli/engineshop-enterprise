<script>
	// if still use the store to manage the modal id, maybe we need to call _modalHide within the onDestroy function

	let open = true;
	function onClc(e) {
		if (!e) {
			return;
		}

		if (e.target.nodeName === 'DIALOG') {
			open = false;
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog class="absolute z-40 bg-slate-700/20 backdrop-blur-md w-full h-full" {open} on:click={onClc}>
	<div class="w-[100px] h-[200px] bg-red-300">
		<p>hai</p>
	</div>
</dialog>
