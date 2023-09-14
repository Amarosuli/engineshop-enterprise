import { error, json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
   let engine_id = url.searchParams.get('engine_id');
   let perPage = url.searchParams.get('perpage');
   let sort = '';
   let filter = `engine_id="${engine_id}"`;
   return json({ engineHistory: await locals.pb.collection('engine_history').getFullList({ sort: sort, filter: filter }) });
}
