<script>
	import { getContext } from 'svelte';

	const { isOpen } = getContext('switcher');
</script>

<div id="dropdown_trigger" class="w-fit h-fit">
	<slot {isOpen} />
</div>
