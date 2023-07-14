<script>
	import { Link } from '$lib/components';
	import { CommonSets } from '$lib/utils/CommonSets';

	const User = {
		// name: 'Lord'
	};
</script>

<div class="header">
	<a href="/">
		<img src="/favicon.png" alt="logo" />
		<span>Engineshop Enterprise</span>
	</a>

	<div>
		{#each CommonSets.HeaderLinks as { title, href, color }}
			{#if !User?.name && title !== 'Logout'}
				<Link {href} {title} {color} />
			{:else if User?.name && title == 'Logout'}
				<Link href="/" title="User" />
				<Link {href} {title} {color} />
			{/if}
		{/each}
	</div>
</div>

<style lang="scss">
	.header {
		@apply flex h-[4rem] select-none items-center justify-between bg-white p-4;

		a {
			@apply flex select-none items-center justify-center space-x-2;
			img {
				@apply h-8 w-8;
			}
			span {
				@apply hidden text-sm font-bold tracking-wider text-slate-700 transition-colors ease-linear hover:text-teal-900 lg:block;
			}
		}

		div {
			@apply flex w-max gap-4;
		}
	}
</style>
