import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { EngineListSchema, LoginSchema } from '$lib/schemas';

export const load = async ({ database }) => {
	return {
		form: await superValidate(EngineListSchema),
		engineList: await database.EngineService.getEngineList(),
		engineModels: await database.EngineModelService.getAll(),
		customers: await database.CustomerService.getAll()
	};
};

export const actions = {
	create: async ({ request, database }) => {
		const form = await superValidate(request, EngineListSchema);

		if (!form.valid) return fail(400, { form });

		let isExist = await database.EngineService.getByEsn(form.data.esn);

		if (isExist) {
			form.errors = {
				esn: 'This Engine Data Already Exist'
			};
			return fail(400, { form });
		}

		try {
			let createEngineResult = await database.EngineService.create(form.data);
			database.Log(createEngineResult);

			let createEngineAvailabilityResult = await database.EngineAvailabilityService.create({
				engine_id: createEngineResult.id,
				date_performed: new Date(),
				status: 'INCOMING'
			});
			database.Log(createEngineAvailabilityResult);

			let createEngineLocationResult = await database.EngineLocationService.create({
				engine_id: createEngineResult.id,
				position: null,
				location: ''
			});
			database.Log(createEngineLocationResult);
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
		const form = await superValidate(formData, EngineListSchema);

		if (!form.valid) return fail(400, { form });

		const id = formData.get('id');

		try {
			let updateResult = await database.EngineService.update(id, form.data);
			database.Log(updateResult);
		} catch (error) {
			form.errors = {
				pocketbaseErrors: `${error.response.message}!, crosscheck the ID or Password, or maybe your ID is actually not registered yet :)`,
				db: `${error.response.message}!, crosscheck the ID or Password, or maybe your ID is actually not registered yet :)`
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
		database.Log(confirmResult);
		if (confirmResult.message === 'failed') {
			form.errors = {
				pocketbaseErrors: confirmResult.message,
				db: confirmResult.message
			};
			return { form };
		}

		// Grab data, Keep here to minimize runtime if step above failure
		const arrayOfId = formData.get('selectedRows').split(',');

		if (arrayOfId.length === 0) return { form };

		arrayOfId.forEach(async (id) => {
			let deleteResult = await database.EngineService.delete(id);
			database.Log(deleteResult);
		});

		return { form };
	}
};
