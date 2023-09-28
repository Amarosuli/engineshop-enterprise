<script>
	import { Link } from '$lib/components';
	import { CommonSets } from '$lib/utils/CommonSets';
	import { page } from '$app/stores';

	import { Dropdown, Button, List } from '$lib/components';

	export let user;
</script>

<div class="header">
	<a href="/">
		<img src="/favicon.png" alt="logo" />
		<span>Engineshop Enterprise</span>
	</a>

	<div>
		{#if user}
			<Dropdown.Root>
				<Dropdown.Trigger let:isOpen color="ghost">
					<!-- <Button.Event title="Open" on:Event={isOpen.switch} classes="btn btn_confirm" /> -->
					<i class="ri-profile-line ri-xl text-sky-700" />
				</Dropdown.Trigger>
				<Dropdown.Content size="w-52">
					{#each CommonSets.HeaderLinks as { title, href, color }}
						{#if !user}
							<Link href="{href}?urlFrom={$page.url.pathname}" {title} {color} />
						{:else if user}
							<Link href="/profile" title={user.name} color="ghost" size="w-full">
								<i class="ri-user-2-fill ri-xl text-sky-700" />
							</Link>
							<!-- @next I think logout should be a button which process request to logout api -->
							<Link href="/auth/logout?urlFrom={$page.url.pathname}" title="Logout" color="ghost" size="w-full">
								<i class="ri-logout-box-line ri-xl text-sky-700" />
							</Link>
						{/if}
					{/each}
				</Dropdown.Content>
			</Dropdown.Root>
		{:else}
			{#each CommonSets.HeaderLinks as { title, href, color }}
				<Link href="{href}?urlFrom={$page.url.pathname}" {title} color="ghost">
					<i class="ri-login-box-line ri-xl text-sky-700" />
				</Link>
			{/each}
		{/if}
	</div>
</div>

<style lang="scss">
	.header {
		@apply relative flex h-[4rem] shrink-0 select-none items-center justify-between bg-slate-300 p-4;

		a {
			@apply flex select-none items-center justify-center space-x-2;
			img {
				@apply h-8 w-8;
			}
			span {
				@apply hidden text-sm font-bold tracking-wider text-slate-700 transition-colors duration-100 ease-linear hover:text-slate-800 lg:block;
			}
		}

		div {
			@apply flex w-max gap-4;
		}
	}
</style>
