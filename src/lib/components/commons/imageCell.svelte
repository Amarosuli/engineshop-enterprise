<script>
	import { getFile } from '$lib/helpers/pocketbaseSchema';
	export let row;

	let src = '/favicon.png';

	if (row?.original?.logo) {
		src = getFile(row?.original?.collectionId, row?.original?.id, row?.original?.logo);
	}
</script>

<img class="w-8 object-contain" {src} alt={row?.original?.logo} crossorigin="anonymous" />
