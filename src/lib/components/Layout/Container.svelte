<div>
	<div class="main-bg" />
	<slot />
</div>

<style lang="postcss">
	.main-bg {
		@apply absolute flex h-full w-full flex-shrink-0 flex-grow-0 flex-col bg-[url('/bg-dashboard.jpg')] bg-cover bg-no-repeat 2xl:h-[95vh] 2xl:w-[95vw];
	}
	div {
		/* @apply absolute h-[100vh] w-[100vh] flex-col justify-center bg-slate-100 lg:w-[1280px] xl:w-[1800px] 2xl:h-[95vh]; */
		@apply absolute flex h-full w-full flex-shrink-0 flex-grow-0 flex-col bg-slate-200 2xl:h-[95vh] 2xl:w-[95vw];
	}
</style>
