<script>
	import '../app.postcss';

	export let data;
	import { Layout } from '$lib/components';
</script>

<svelte:component this={Layout} user={data.user}>
	<slot />
</svelte:component>
