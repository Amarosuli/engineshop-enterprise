import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { LoginSchema } from '$lib/schemas';

export const load = async ({ url, locals, database }) => {
	if (locals.pb.authStore.model) {
		let urlFrom = url.searchParams.get('urlFrom') || '/';
		redirect(303, urlFrom);
	}

	return { form: await superValidate(LoginSchema) };
};

export const actions = {
	default: async ({ request, database }) => {
		const form = await superValidate(request, LoginSchema);
		const { username, password } = form.data;

		if (!form.valid) return fail(400, { form });

		let loginResult = await database.LoginService.login(username, password);

		if (loginResult.message === 'failed') {
			form.errors = {
				pocketbaseErrors: `${loginResult.message}!, crosscheck the ID or Password, or maybe your ID is actually not registered yet :)`
			};
			return fail(loginResult.status, { form });
		}

		return { form };
	}
};
