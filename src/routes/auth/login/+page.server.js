import { superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';

import { LoginService } from '$lib/services';
import { LoginSchema } from '$lib/schemas';

export const load = async ({ url, locals, database }) => {
   database.ServiceRegister(LoginService)

   if (locals.pb.authStore.model) {
      let urlFrom = url.searchParams.get('urlFrom') || '/';
      throw redirect(303, urlFrom);
   }

   return { form: await superValidate(LoginSchema) };
};

export const actions = {
   default: async ({ request, database }) => {
      database.ServiceRegister(LoginService)

      const form = await superValidate(request, LoginSchema);
      const { username, password } = form.data;

      if (!form.valid) return fail(400, { form })

      let loginResult = await database.LoginService.login(username, password)

      if (loginResult.message === 'failed') {
         form.errors = {
            pocketbaseErrors: `${loginResult.message}!, crosscheck the ID or Password, or maybe your ID is actually not registered yet :)`
         };
         return fail(loginResult.status, { form });
      }

      return { form };
   }
};
