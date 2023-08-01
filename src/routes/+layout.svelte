<script>
	import '../app.postcss';

	import '$lib/scss/main.scss';
	import '$lib/fonts/remixicon/remixicon.css';

	export let data;
	import { Layout } from '$lib/components';
</script>

<svelte:component this={Layout} user={data.user}>
	<slot />
</svelte:component>
