import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';

import { _row } from '$lib/utils/store'
import { CommonHelpers } from '$lib/utils/CommonHelpers'

export const load = async ({ locals }) => {
   let engineModels = async () => {
      /**
       * add 'family' key to array
       * value from the expand relation ( expand.family_id.name )
       */
      let raw = await CommonHelpers.getEngineModels(locals)
      let engineModels = raw.map(value => ({ ...value, family: value?.expand?.family_id?.name }))
      return engineModels
   }

   return {
      form: await superValidate(CommonHelpers.engineModelSchema),
      engineModels: await engineModels(),
      engineFamilies: await CommonHelpers.getEngineFamilies(locals), // required to be an select options for the create form and update form


   }
}

export const actions = {
   create: async ({ request, locals }) => {
      const form = await superValidate(request, CommonHelpers.engineModelSchema)

      if (!form.valid) {
         console.log('NOT VALID: ', form);
         return fail(400, { form })
      }

      try {
         await CommonHelpers.createData(locals, 'engine_models', form.data)
      } catch (error) {
         form.errors = {
            pocketbaseErrors: `${error.response.message}!, crosscheck the ID or Password, or maybe your ID is actually not registered yet :)`
         }
         return fail(error.status, { form })
      }
      // console.log('VALID: ', form);

      return { form }
   },
   update: async ({ request, locals }) => {
      /**
       * grab raw form data into formData variable,
       * so we can gat the data from input id (hidden) which is not include in the zod schema
       * then formData pass into superValidate to validate what necessary
       */
      const formData = await request.formData()
      const form = await superValidate(formData, CommonHelpers.engineModelSchema)

      if (!form.valid) {
         console.log('NOT VALID: ', form);
         return fail(400, { form })
      }

      const id = formData.get('id')

      try {
         /**
          * it feels wasting time to check form data is equal to curent data.
          *  will remove this or find the new better way
          */
         await CommonHelpers.updateData(locals, 'engine_models', id, form.data)
      } catch (error) {
         form.errors = {
            pocketbaseErrors: `${error.response.message}!, crosscheck the ID or Password, or maybe your ID is actually not registered yet :)`
         }
         return fail(error.status, { form })
      }

      return { form }
   },
   delete: async ({ request, locals }) => {
      const form = Object.fromEntries(await request.formData())
      const keys = Object.keys(form)
      console.log(keys.length);

      keys.forEach(async (k, index) => {
         // NOTE: Postpone, redirect, goto, standard headers are not working to reload page.

         let id = form[k]
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
      })
   }
};