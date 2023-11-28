import { redirect } from '@sveltejs/kit';

export const GET = async ({ url, locals }) => {
	let urlFrom = url.searchParams.get('urlFrom');

	if (!locals.pb.authStore.model) return;
	try {
		await locals.pb.authStore.clear();
	} catch (_) {}

	throw redirect(303, urlFrom);
};
