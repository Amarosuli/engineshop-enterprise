<script>
	import { page } from '$app/stores';
</script>

<div class="absolute inset-0 flex w-full justify-center items-center">
	<div class="relative flex flex-col gap-2 space-x-4">
		<span class="absolute text-2xl font-semibold tracking-wide bg-red-300 w-max px-2 mb-2">Error . Page</span>
		<span class="text-4xl font-bold text-sky-800">{$page.status}</span>
		<p>{$page.error?.message}</p>
	</div>
</div>
