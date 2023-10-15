<div>
	<slot />
</div>

<style lang="postcss">
	div {
		height: 100lvh;
		width: 100lvw;
		@apply relative flex h-screen w-screen items-center justify-center bg-[url('/bg.jpg')] bg-cover;
	}
</style>
