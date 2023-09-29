<script>
	import { File } from '$lib/components';

	let a = 'b';

	// create
	// recent dn
</script>

<svelte:head>
	<title>Delivery Note</title>
</svelte:head>

<div class="absolute inset-0 flex">
	<div class="w-2/3 bg-white h-full flex flex-col">
		<div class="h-20 p-4 flex justify-between items-center">
			<p class="text-xl text-slate-700 font-extrabold">Create Delivery Note</p>
			<div>actions, all button, etc</div>
		</div>
		<div class="w-full h-full flex">
			<div class="w-1/2 p-2 bg-stone-300">
				left, all basic input
				<File accept=".pdf" />
			</div>
			<div class="w-1/2 p-2 bg-zinc-300">right, all data input</div>
		</div>
	</div>
	<div class="w-1/3 bg-amber-300 h-full">
		<div class="h-20 p-4 pr-8">
			<p class="text-xl text-slate-700 font-extrabold text-right">Recent Data</p>
		</div>
	</div>
</div>
