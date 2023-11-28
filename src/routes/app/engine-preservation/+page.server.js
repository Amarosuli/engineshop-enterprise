import { EnginePreservationSchema, LoginSchema } from '$lib/schemas';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';

export const load = async ({ database }) => {
	return {
		form: await superValidate(EnginePreservationSchema),
		engineList: await database.PreservationService.getEngineList(),
		preservationHistory: await database.PreservationService.getHistory()
	};
};

export const actions = {
	create: async ({ request, database }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, EnginePreservationSchema);

		if (!form.valid) return fail(400, { form });

		const tag = formData.get('tag');

		try {
			if (tag.size === 0) formData.delete('tag');
			let createResult = await database.PreservationService.create(formData);
			database.Log(createResult);
		} catch (error) {
			form.errors = {
				pocketbaseErrors: `${error.response.message}!, crosscheck the ID or Password, or maybe your ID is actually not registered yet :)`,
				db: `Error :: ${error.response.message},`
			};
			return fail(error.status, { form });
		}

		return { form };
	},
	update: async ({ request, locals, database }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, EnginePreservationSchema);

		if (!form.valid) return fail(400, { form });

		const id = formData.get('id');
		const tag = formData.get('tag');

		try {
			if (tag.size === 0) formData.delete('tag');
			let updateResult = await database.PreservationService.update(id, formData);
			console.log(updateResult);
			database.Log(updateResult);
		} catch (error) {
			form.errors = {
				pocketbaseErrors: `${error.response.message}!, crosscheck the ID or Password, or maybe your ID is actually not registered yet :)`,
				db: `Error :: ${error.response.message},`
			};
			return fail(error.status, { form });
		}

		return { form };
	},
	delete: async ({ request, database }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, LoginSchema);

		if (!form.valid) return fail(400, { form });

		const { username, password } = form.data;

		// Confirmation to delete
		let confirmResult = await database.UserService.confirm(username, password);

		console.log(confirmResult.message === 'failed');
		if (confirmResult.message === 'failed') {
			form.errors = {
				pocketbaseErrors: confirmResult.detail,
				db: confirmResult.detail
			};
			return fail(400, { form });
		}

		// Grab data, Keep here to minimize runtime if step above failure
		const historyId = formData.get('historyId');

		if (historyId.length === 0) return { form };

		let deleteResult = await database.PreservationService.delete(historyId);
		database.Log(deleteResult);

		return { form };
	}
};
