import { fail } from '@sveltejs/kit';

import { _row } from '$lib/utils/Stores';
import { CommonHelpers } from '$lib/utils/CommonHelpers';

import eventsource from 'eventsource';
global.EventSource = eventsource;

export const load = async ({ locals }) => {
	let engineHistory = await locals.pb.collection('engine_history').getFullList();
	let engineList = async () => {
		/**
		 * add 'model' and 'customer key to array
		 * value from the expand relation ( expand.model_id.name, expand.customer_id.name )
		 */
		let raw = await CommonHelpers.getEngineList(locals);
		let result = raw.map((value) => ({
			...value,
			model: value?.expand?.model_id?.name,
			customer: value?.expand?.customer_id?.name,
			isAvailable: engineHistory.find((v) => v.history_number == 1 && v.engine_id == value.id)
		}));
		let final = result.filter((value) => value.isAvailable);
		return final;
	};
	return {
		engineList: await engineList(),
		engineLocation: await CommonHelpers.getEngineLocation(locals)
	};
};

export const actions = {
	update: async ({ request, locals }) => {
		let form = await request.formData();
		let id = form.get('id');
		let x = form.get('x');
		let y = form.get('y');
		let location = form.get('location');

		try {
			let res = await locals.pb.collection('engine_location').update(id, { position: { x, y }, location });
		} catch (err) {
			console.log('::ERROR::\n', err);
		}
	}
};
