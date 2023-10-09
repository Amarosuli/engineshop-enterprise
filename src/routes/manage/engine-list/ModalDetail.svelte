<script>
	import { CommonHelpers } from '$lib/utils/CommonHelpers';

	import { onMount, onDestroy } from 'svelte';
	export let engine_id;

	let currentLocation = '';

	let getLocation = async () => {
		const parameter = `engine_id="${engine_id}"`;
		return await CommonHelpers.pb.collection('engine_location').getFirstListItem(parameter);
	};

	onMount(async () => {
		currentLocation = await getLocation();
		CommonHelpers.pb.collection('engine_location').subscribe('*', function (e) {
			let { action, record } = e;

			switch (action) {
				// case 'create':
				// 	updateOnCreate(e);
				// 	break;
				case 'update':
					currentLocation = record;
					// updatePosition(id, position);
					break;
				// case 'delete':
				// 	updateOnDelete(e);
				// 	break;
				default:
					break;
			}
		});
	});
	onDestroy(() => {
		CommonHelpers.pb.collection('engine_location').unsubscribe('*');
	});
</script>

<span class="font-bold text-right">{currentLocation.location}</span>
