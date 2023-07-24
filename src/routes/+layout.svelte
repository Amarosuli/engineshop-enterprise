<script>
	import '../app.postcss';
	import '$lib/scss/_base.scss';
	import '$lib/scss/_table.scss';
	import '$lib/scss/_modal.scss';

	export let data;
	import { Layout } from '$lib/components';
</script>

<svelte:component this={Layout} user={data.user}>
	<slot />
</svelte:component>
