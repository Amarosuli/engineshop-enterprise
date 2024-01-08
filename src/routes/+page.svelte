<script>
	import { Img } from '@ui';
	import { CommonSets } from '$lib/utils/CommonSets';

	let { apps: AppsMenu, manages: ManagesMenu } = CommonSets.MainMenu;
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="mx-auto flex w-full flex-col items-start justify-start space-y-3 p-6 font-nunito">
	<strong class="rounded-md bg-slate-700/50 px-3 py-1 text-slate-100">Apps</strong>
	<div class="menuContainer">
		{#each AppsMenu as { title, href, icon, versionStatus }, i}
			<a {href} class="menuLink">
				<div class="menuContent">
					<div class="menuIcon">
						<svelte:component this={icon} size="20" class="text-sky-700"></svelte:component>
					</div>
					<span class="menuTitle">{title}</span>
				</div>
				<span class:!hidden={versionStatus === 'PRODUCTION'} class="menuTag">{versionStatus[0]}</span>
			</a>
		{/each}
	</div>
	<strong class="rounded-md bg-slate-700/50 px-3 py-1 text-slate-100">Manages</strong>
	<div class="menuContainer">
		{#each ManagesMenu as { title, href, icon, versionStatus }, i}
			<a {href} class="menuLink">
				<div class="menuContent">
					<div class="menuIcon">
						<svelte:component this={icon} size="20" class="text-sky-700"></svelte:component>
					</div>
					<span class="menuTitle">{title}</span>
				</div>
				<span class:!hidden={versionStatus === 'PRODUCTION'} class="menuTag">{versionStatus[0]}</span>
			</a>
		{/each}
	</div>
</div>

<style lang="scss">
	.menuContainer {
		@apply mx-auto grid grid-cols-3 items-center gap-8 pb-3 sm:mx-0 sm:grid-cols-5;
	}
	.menuLink {
		@apply relative h-24 w-24 select-none overflow-hidden rounded-md bg-slate-200 shadow transition-all ease-out hover:bg-orange-200 hover:shadow-lg;
	}
	.menuContent {
		@apply flex h-full flex-col items-center justify-between;
	}
	.menuIcon {
		@apply my-auto flex h-10 w-10 items-center justify-center text-base;
	}
	.menuTitle {
		@apply flex h-10 w-full items-center justify-center bg-white px-1 text-center text-xxs font-semibold text-slate-500;
	}
	.menuTag {
		@apply absolute right-0 top-0 z-10 flex h-5 w-5 items-center justify-center rounded-bl-md bg-purple-700 text-center text-xxxs text-white antialiased shadow-md;
	}
	// .imgIcon {
	// 	@apply h-10 w-10 border-2 border-slate-700;
	// }
</style>
