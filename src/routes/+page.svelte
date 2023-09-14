<script>
	import { Img } from '$lib/components';
	import { CommonSets } from '$lib/utils/CommonSets';

	let { apps: AppsMenu, manages: ManagesMenu } = CommonSets.MainMenu;
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="p-6 w-full mx-auto flex flex-col justify-start items-start space-y-3 font-nunito">
	<strong>Apps</strong>
	<div class="menuContainer">
		{#each AppsMenu as { title, href, icon }, i}
			<a {href} class="menuLink">
				<div class="menuContent">
					<div class="menuIcon">
						<i class="{icon} ri-2x text-sky-600" />
					</div>
					<span class="menuTitle">{title}</span>
				</div>
			</a>
		{/each}
	</div>
	<strong>Manages</strong>
	<div class="menuContainer">
		{#each ManagesMenu as { title, href, icon }, i}
			<a {href} class="menuLink">
				<div class="menuContent">
					<div class="menuIcon">
						<Img src={icon} alt="icon" />
						<!-- <img src={icon} alt="icon" crossorigin="anonymous" class="imgIcon" /> -->
					</div>
					<span class="menuTitle">{title}</span>
				</div>
			</a>
		{/each}
	</div>
</div>

<style lang="scss">
	.menuContainer {
		@apply mx-auto grid grid-cols-3 items-center gap-8 pb-3 sm:mx-0 sm:grid-cols-5;
	}
	.menuLink {
		@apply h-24 w-24 select-none rounded-md bg-slate-200 p-2 shadow transition-all ease-out hover:bg-orange-200 hover:shadow-lg;
	}
	.menuContent {
		@apply flex h-full flex-col items-center justify-start;
	}
	.menuIcon {
		@apply my-auto flex h-10 w-10 items-center justify-center text-base;
	}
	.menuTitle {
		@apply text-center text-xxs font-semibold text-slate-500;
	}
	.imgIcon {
		@apply h-10 w-10 border-2 border-slate-700;
	}
</style>
