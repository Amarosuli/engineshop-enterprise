import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { EngineModelSchema, LoginSchema } from '$lib/schemas';

export const load = async ({ database }) => {
	let engineModels = async () => {
		let raw = await database.EngineModelService.getAll({ expand: 'family_id' });
		let engineModels = raw.map((value) => ({ ...value, family: value?.expand?.family_id?.name }));
		return engineModels;
	};

	return {
		form: await superValidate(EngineModelSchema),
		engineModels: await engineModels(),
		engineFamilies: await database.EngineFamilyService.getAll()
	};
};

export const actions = {
	create: async ({ request, database }) => {
		const form = await superValidate(request, EngineModelSchema);

		if (!form.valid) return fail(400, { form });

		try {
			let createResult = await database.EngineModelService.create(form.data);
			database.Log(createResult);
		} catch (error) {
			form.errors = {
				pocketbaseErrors: `${error.response.message}!, crosscheck the ID or Password, or maybe your ID is actually not registered yet :)`
			};
			return fail(error.status, { form });
		}

		return { form };
	},
	update: async ({ request, database }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, EngineModelSchema);

		if (!form.valid) return fail(400, { form });

		const id = formData.get('id');

		try {
			let updateResult = await database.EngineModelService.update(id, form.data);
			database.Log(updateResult);
		} catch (error) {
			form.errors = {
				pocketbaseErrors: `${error.response.message}!, crosscheck the ID or Password, or maybe your ID is actually not registered yet :)`
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

		if (confirmResult.message === 'failed') {
			form.errors = {
				pocketbaseErrors: confirmResult.message
			};
			return { form };
		}

		// Grab data, Keep here to minimize runtime if step above failure
		const arrayOfId = formData.get('selectedRows').split(',');

		if (arrayOfId.length === 0) return { form };

		arrayOfId.forEach(async (id) => {
			let deleteResult = await database.EngineModelService.delete(id);
			database.Log(deleteResult);
		});

		return { form };
	}
};
