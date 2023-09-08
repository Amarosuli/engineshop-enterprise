import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';

import { _row } from '$lib/utils/Stores';
import { CommonHelpers } from '$lib/utils/CommonHelpers';

export const load = async ({ locals }) => {
	return {
		engineFamily: await CommonHelpers.getEngineFamilies(locals),
		form: await superValidate(CommonHelpers.engineFamilySchema)
	};
};

export const actions = {
	create: async ({ request, locals }) => {
		const form = await superValidate(request, CommonHelpers.engineFamilySchema);

		if (!form.valid) {
			console.log('NOT VALID: ', form);
			return fail(400, { form });
		}

		try {
			CommonHelpers.createData(locals, 'engine_families', form.data);
		} catch (error) {
			form.errors = {
				pocketbaseErrors: `${error.response.message}!, crosscheck the ID or Password, or maybe your ID is actually not registered yet :)`
			};
			return fail(error.status, { form });
		}

		return { form };
	},
	update: async ({ request, locals }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, CommonHelpers.engineFamilySchema);

		if (!form.valid) {
			console.log('NOT VALID: ', form);
			return fail(400, { form });
		}

		const id = formData.get('id');

		try {
			CommonHelpers.updateData(locals, 'engine_families', id, form.data);
		} catch (error) {
			form.errors = {
				pocketbaseErrors: `${error.response.message}!, crosscheck the ID or Password, or maybe your ID is actually not registered yet :)`
			};
			return fail(error.status, { form });
		}

		return { form };
	},
	delete: async ({ request, locals }) => {
		const form = Object.fromEntries(await request.formData());
		const keys = Object.keys(form);
		console.log(keys.length);

		keys.forEach(async (k, index) => {
			// NOTE: Postpone, redirect, goto, standard headers are not working to reload page.

			let id = form[k];
			console.log(id);
			// try {
			//    let result = await locals.pb.collection('engine_families').delete(id)
			//    console.log('result-', result, id);
			// } catch (error) {
			//    console.log('ERROR : ', error);
			// }

			if (index === keys.length - 1) {
				// return {
				//    headers: { Location: '/manage/engine-family' },
				//    status: 302
				// }
			}
		});
	}
};
