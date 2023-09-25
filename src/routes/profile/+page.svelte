<script>
	import { Img } from '$lib/components';
	import { CommonHelpers } from '$lib/utils/CommonHelpers';
	export let data;
	const { user, unit, role } = data;
</script>

<div class="flex w-full justify-center items-start mt-8">
	<div class="w-1/2 h-max flex flex-col items-center">
		<h1 class="text-2xl font-bold">User Profile Page</h1>
		<div class="flex flex-col gap-2 mt-3">
			<Img
				className="object-cover h-40 w-40 rounded-full self-center"
				src={user.avatar ? CommonHelpers.getFileUrl(user.collectionId, user.id, user.avatar) : '/'}
				alt={user.avatar}
				crossorigin="anonymous" />
			<p class="py-2 px-6 text-sm bg-slate-200">Name: <span>{user?.name}</span></p>
			<p class="py-2 px-6 text-sm bg-slate-200">Email: <span>{user?.email}</span></p>
			<p class="py-2 px-6 text-sm bg-slate-200">Employee ID: <span>{user?.username}</span></p>
			<p class="py-2 px-6 text-sm bg-slate-200">Unit: <span>{unit?.name}</span></p>
			<p class="py-2 px-6 text-sm bg-slate-200">Role: <span>{role?.name}</span></p>
			<p class="py-2 px-6 text-sm bg-slate-200">Authorization: <span>{user?.scope}</span></p>
		</div>
	</div>
</div>
