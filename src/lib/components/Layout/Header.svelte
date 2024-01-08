<script>
	import { CommonSets } from '$lib/utils/CommonSets';
	import { page } from '$app/stores';

	import { Dropdown, Button, List, Link } from '@ui';
	import { Key, LogIn, LogOut, ChevronDownCircle, UserCircle } from 'lucide-svelte';
	import { slide } from 'svelte/transition';

	export let user;

	console.log($page.url.pathname);
</script>

<div class="header">
	<div class="flex w-full items-center justify-between">
		<a href="/">
			<img src="/favicon.png" alt="logo" />
			<span>Engineshop Enterprise</span>
		</a>

		{#if user && $page.url.pathname !== '/'}
			<div transition:slide={{ axis: 'x' }} class="hidden h-9 items-center justify-center gap-2 rounded-l-lg bg-white p-4 text-xs lg:flex">
				<span class="">Manages</span>
				<span class="">Apps</span>
			</div>
		{/if}
	</div>

	<div class="right-menu">
		{#if user}
			<Dropdown.Root>
				<Dropdown.Trigger let:isOpen color="light" class="!rounded">
					<!-- <Button.Event title="Open" on:Event={isOpen.switch} classes="btn btn_confirm" /> -->
					<ChevronDownCircle size="20" class="font-bold" />
				</Dropdown.Trigger>
				<Dropdown.Content size="w-52">
					{#each CommonSets.HeaderLinks as { title, href, color }}
						{#if !user}
							<Link href="{href}?urlFrom={$page.url.pathname}" {title} {color} />
						{:else if user}
							<Link href="/profile" title={user.name} color="ghost" size="w-full">
								<UserCircle size="15" />
							</Link>
							<!-- @next I think logout should be a button which process request to logout api -->
							<Link href="/auth/logout?urlFrom={$page.url.pathname}" title="Logout" color="ghost" size="w-full">
								<LogOut size="15" />
							</Link>
						{/if}
					{/each}
				</Dropdown.Content>
			</Dropdown.Root>
		{:else}
			{#each CommonSets.HeaderLinks as { title, href, color }}
				<Link href="{href}?urlFrom={$page.url.pathname}" color="ghost">
					<!-- <span class="!text-xs font-semibold">Login</span> -->
					<LogIn size="15" class="font-bold" />
				</Link>
			{/each}
		{/if}
	</div>
</div>

<style lang="scss">
	.header {
		@apply relative flex h-[4rem] shrink-0 select-none items-center justify-between bg-slate-300 p-4;

		a {
			@apply flex select-none items-center justify-center space-x-2 pl-4;
			img {
				@apply h-8 w-8;
			}
			span {
				@apply hidden text-sm font-bold tracking-wider text-slate-700 transition-colors duration-100 ease-linear hover:text-slate-800 lg:block;
			}
		}

		.right-menu {
			@apply flex w-max gap-4;
		}
	}
</style>
