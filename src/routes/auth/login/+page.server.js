import { superValidate } from 'sveltekit-superforms/server'
import { LoginSchema } from '$lib/helpers/zodSchema'
import { fail, redirect } from '@sveltejs/kit'

export const load = async ({ locals }) => {
   if (locals.pb.authStore.model) {
      throw redirect(303, '/')
   }
   const form = await superValidate(LoginSchema)

   return { form }
}

export const actions = {
   default: async ({ request, locals }) => {
      const form = await superValidate(request, LoginSchema)

      if (!form.valid) {
         console.log(form);
         return fail(400, { form })
      }

      /**
       * Login with helper provide by pocketbase 'authWithPassword'
       * It need username and password
       * So username will be the field for employee Id
      */

      try {
         const { username, password } = form.data
         await locals.pb.collection('users').authWithPassword(username, password, { expand: 'unit' })
      } catch (error) {
         form.errors = {
            pocketbaseErrors: `${error.response.message}!, crosscheck the ID or Password, or maybe your ID is actually not registered yet :)`
         }
         return fail(error.status, { form })
      }

      return { form }
   }
}