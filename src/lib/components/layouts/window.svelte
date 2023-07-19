<script>
	import { modal, _row } from '$lib/utils/store';

	const escHandler = (e) => {
		if (!e) {
			return;
		}

		if (e.keyCode === 27) {
			// maybe we can use pop function in store to hide modal one by one according to it's order
			modal.reset(); // reset modal store
			$_row = {}; // reset table row store
		}
	};
</script>

<!-- <svelte:window on:keydown={escHandler} /> -->
