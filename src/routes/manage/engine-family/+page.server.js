import { superValidate } from 'sveltekit-superforms/server';
import { getEngineFamily } from '$lib/helpers/pocketbaseSchema'
import { engineFamilySchema } from '$lib/helpers/zodSchema'
import { fail } from '@sveltejs/kit';

export const load = async ({ locals }) => {
   const form = await superValidate(engineFamilySchema)
   return {
      engineFamily: await getEngineFamily(locals),
      form

   }
}

export const actions = {
   create: async (event) => {
      const form = await superValidate(event, engineFamilySchema)

      if (!form.valid) {
         console.log('NOT VALID: ', form);
         return fail(400, { form })
      }

      /**
       * 
      */

      try {
         await event.locals.pb.collection('engine_families').create(form.data)
      } catch (error) {
         form.errors = {
            pocketbaseErrors: `${error.response.message}!, crosscheck the ID or Password, or maybe your ID is actually not registered yet :)`
         }
         return fail(error.status, { form })
      }
      console.log(form);

      return { form }
   }
};