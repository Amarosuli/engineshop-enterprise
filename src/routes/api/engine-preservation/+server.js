import { error, json } from '@sveltejs/kit';
import { CommonHelpers } from '$lib/utils/CommonHelpers';

export async function GET({ url, locals }) {
	let page = url.searchParams.get('page');
	let perPage = url.searchParams.get('perpage');
	let sort = '-created';
	let filter = '';
	let collectionName = 'customers';
	return json({ customers: await locals.pb.collection(collectionName).getList(page, perPage, { sort: sort }) });
}
