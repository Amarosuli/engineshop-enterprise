<script>
	import 'iconify-icon';
	import { CommonSets } from '$lib/utils/CommonSets';

	let { apps: AppsMenu, manages: ManagesMenu } = CommonSets.MainMenu;
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="p-6 w-full mx-auto flex flex-col justify-start items-start space-y-3">
	<strong>Apps</strong>
	<div class="menuContainer">
		{#each AppsMenu as { title, href, icon }, i}
			<a {href} class="menu">
				<div><iconify-icon style="font-size: 30px;" {icon} /></div>
				<span>{title}</span>
			</a>
		{/each}
	</div>
	<strong>Manages</strong>
	<div class="menuContainer">
		{#each ManagesMenu as { title, href, icon }, i}
			<a {href} class="menu">
				<!-- <div><iconify-icon style="font-size: 30px;" {icon} /></div> -->
				<div class="relative"><img src={icon} alt="icon" crossorigin="anonymous" /></div>
				<span>{title}</span>
			</a>
		{/each}
	</div>
</div>

<style lang="scss">
	.menuContainer {
		@apply mx-auto grid grid-cols-3 items-center gap-8 pb-3 sm:mx-0 sm:grid-cols-5;
	}
	.menu {
		@apply flex h-24 w-[8rem] select-none flex-col items-center justify-around space-y-1 rounded-md bg-slate-200 p-2 shadow transition-all ease-out hover:bg-stone-200 hover:shadow-md;
		div {
			@apply flex h-10 w-full items-center justify-center;

			img {
				@apply w-10 border-2 border-slate-700;
			}
		}
		span {
			@apply text-center text-xs font-semibold text-slate-500;
		}
	}
</style>
