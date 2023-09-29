<script>
	import { Img, List } from '$lib/components';
	import { CommonHelpers } from '$lib/utils/CommonHelpers';
	export let data;
	const { user, unit, role } = data;
</script>

<div class="flex w-full justify-center items-start mt-8">
	<div class="w-full h-max flex flex-col items-center">
		<h1 class="text-2xl text-slate-800 font-extrabold">User Profile Page</h1>
		<div class="flex flex-col mt-3 text-slate-700">
			<Img
				className="object-cover mb-4 h-40 w-40 rounded-full self-center"
				src={user.avatar ? CommonHelpers.getFileUrl(user.collectionId, user.id, user.avatar) : '/'}
				alt={user.avatar}
				crossorigin="anonymous" />
			<List.Item>
				<p class="text-xs xl:text-sm">Name:</p>
				<span class="text-xs xl:text-sm text-right font-semibold">{user?.name}</span>
			</List.Item>
			<List.Item>
				<p class="text-xs xl:text-sm">Email:</p>
				<span class="text-xs xl:text-sm text-right font-semibold">{user?.email}</span>
			</List.Item>
			<List.Item>
				<p class="text-xs xl:text-sm">Employee ID:</p>
				<span class="text-xs xl:text-sm text-right font-semibold">{user?.username}</span>
			</List.Item>
			<List.Item>
				<p class="text-xs xl:text-sm">Unit:</p>
				<span class="text-xs xl:text-sm text-right font-semibold">{unit?.name}</span>
			</List.Item>
			<List.Item>
				<p class="text-xs xl:text-sm">Role:</p>
				<span class="text-xs xl:text-sm text-right font-semibold">{role?.name}</span>
			</List.Item>
			<List.Item>
				<p class="text-xs xl:text-sm">Authorization:</p>
				<span class="text-xs xl:text-sm text-right font-semibold">{user?.scope}</span>
			</List.Item>
		</div>
	</div>
</div>
