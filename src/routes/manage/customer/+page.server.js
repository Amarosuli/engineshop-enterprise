import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { CustomerSchema, LoginSchema } from '$lib/schemas';

export const load = async ({ database }) => {
	return {
		customers: await database.CustomerService.getAll(),
		form: await superValidate(CustomerSchema)
	};
};

export const actions = {
	create: async ({ request, database }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, CustomerSchema);

		if (!form.valid) return fail(400, { form });

		const logo = formData.get('logo');

		try {
			if (logo.size === 0) formData.delete('logo');
			let createResult = await database.CustomerService.create(formData);
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
		const form = await superValidate(formData, CustomerSchema);

		if (!form.valid) return fail(400, { form });

		const id = formData.get('id');
		const logo = formData.get('logo');

		try {
			if (logo.size === 0) formData.delete('logo');
			let updateResult = await database.CustomerService.update(id, formData);
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

		if (confirmResult.message === 'failed') {
			form.errors = {
				pocketbaseErrors: confirmResult.message,
				db: confirmResult.message
			};
			return fail(400, { form });
		}

		// Grab data, Keep here to minimize runtime if step above failure
		const arrayOfId = formData.get('selectedRows').split(',');

		if (arrayOfId.length === 0) return { form };

		arrayOfId.forEach(async (id) => {
			let deleteResult = await database.CustomerService.delete(id);
			database.Log(deleteResult);
		});

		return { form };
	}
};
