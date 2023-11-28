import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

import { _row } from '$lib/utils/Stores';
import { CommonHelpers } from '$lib/utils/CommonHelpers';

export const load = async ({ locals }) => {
	let engineList = async () => {
		/**
		 * add 'model' and 'customer key to array
		 * value from the expand relation ( expand.model_id.name, expand.customer_id.name )
		 */
		let raw = await CommonHelpers.getEngineList(locals);
		let engineModels = raw.map((value) => ({ ...value, model: value?.expand?.model_id?.name, customer: value?.expand?.customer_id?.name }));
		return engineModels;
	};

	let engineAvailability = async () => {
		let raw = await CommonHelpers.getEngineAvailability(locals);
		let result = raw.map((value) => ({ ...value, esn: value?.expand?.engine_id?.esn }));
		return result;
	};

	let engineHistory = async () => {
		let raw = await CommonHelpers.getEngineHistory(locals);
		let result = raw.map((value) => ({ ...value, esn: value?.expand?.engine_id?.esn }));
		return result;
	};

	return {
		form: await superValidate(CommonHelpers.engineAvailabilitySchema),
		engineHistory: await engineHistory(),
		engineList: await engineList(),
		engineAvailability: await engineAvailability()
	};
};

export const actions = {
	incoming: async ({ request, locals }) => {
		const form = await superValidate(request, CommonHelpers.engineAvailabilitySchema);

		if (!form.valid) {
			console.log('NOT VALID: ', form);
			return fail(400, { form });
		}

		try {
			// create engine_availability, then set availability in engine_list to true
			let engineAvailabilityData = { engine_id: id, date_in: new Date(), isInShop: true };
			await locals.pb.collection('engine_availability').create(engineAvailabilityData);
			await locals.pb.collection('engine_list').update(id, { isAvailable: true });
		} catch (error) {
			form.errors = {
				pocketbaseErrors: `${error.response.message}!, crosscheck the ID or Password, or maybe your ID is actually not registered yet :)`
			};
			return fail(error.status, { form });
		}
		// console.log('VALID: ', form);

		return { form };
	},
	outgoing: async ({ request, locals }) => {
		const formData = await request.formData();
		const { id } = Object.fromEntries(formData);
		const form = await superValidate(formData, CommonHelpers.engineAvailabilitySchema);

		if (!form.valid) {
			console.log('NOT VALID: ', form);
			return fail(400, { form });
		}

		try {
			// create engine_availability, then set availability in engine_list to true
			let engineAvailabilityData = { date_out: form.data.date_out, isInShop: false };
			await locals.pb.collection('engine_availability').update(id, engineAvailabilityData);
			await locals.pb.collection('engine_list').update(form.data.engine_id, { isAvailable: false });
		} catch (error) {
			form.errors = {
				pocketbaseErrors: `${error.response.message}!, crosscheck the ID or Password, or maybe your ID is actually not registered yet :)`
			};
			return fail(error.status, { form });
		}
		// console.log('VALID: ', form);

		return { form };
	},
	update: async ({ request, locals }) => {
		/**
		 * grab raw form data into formData variable,
		 * so we can get the data from input id (hidden) which is not include in the zod schema
		 * then formData pass into superValidate to validate what necessary
		 */
		const formData = await request.formData();
		const { id } = Object.fromEntries(formData);

		// const form = await superValidate(request, engineListSchema) -- old
		const form = await superValidate(formData, CommonHelpers.engineListSchema);

		if (!form.valid) {
			console.log('NOT VALID: ', form);
			return fail(400, { form });
		}

		try {
			await locals.pb.collection('engine_list').update(id, form.data);
		} catch (error) {
			form.errors = {
				pocketbaseErrors: `${error.response.message}!, crosscheck the ID or Password, or maybe your ID is actually not registered yet :)`
			};
			return fail(error.status, { form });
		}

		return { form };
	}
};
