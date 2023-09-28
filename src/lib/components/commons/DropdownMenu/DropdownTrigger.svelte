<script>
	import { getContext } from 'svelte';

	const { isOpen } = getContext('switcher');
</script>

<button id="dropdown_trigger" on:click|stopPropagation={isOpen.switch} class="w-fit h-fit p-3 hover:bg-slate-100 transition-colors ease-out">
	<slot {isOpen} />
</button>
