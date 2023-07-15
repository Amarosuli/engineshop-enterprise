<script>
	export let data;
	const { user, unit } = data;

	// console.log(user, unit);
</script>

<div class="flex w-full justify-center items-start mt-8">
	<div class="w-1/2 h-max flex flex-col items-center">
		<h1 class="text-2xl font-bold">User Profile Page</h1>
		<div class="flex flex-col gap-1 mt-3">
			<p class="py-2 px-6 text-lg bg-slate-200">Name: <span>{user?.name}</span></p>
			<p class="py-2 px-6 text-lg bg-slate-200">Email: <span>{user?.email}</span></p>
			<p class="py-2 px-6 text-lg bg-slate-200">Employee ID: <span>{user?.username}</span></p>
			<p class="py-2 px-6 text-lg bg-slate-200">Unit: <span>{unit?.name}</span></p>
			<p class="py-2 px-6 text-lg bg-slate-200">Role: <span>{user?.role}</span></p>
			<p class="py-2 px-6 text-lg bg-slate-200">Authorization: <span>{user?.scope}</span></p>
		</div>
	</div>
</div>
