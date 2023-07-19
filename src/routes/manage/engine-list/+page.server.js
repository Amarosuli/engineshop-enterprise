import { superValidate } from 'sveltekit-superforms/server';
import { getEngineList } from '$lib/helpers/pocketbaseSchema'
import { customerSchema } from '$lib/helpers/zodSchema'
import { fail, redirect } from '@sveltejs/kit';
import { _row } from '$lib/utils/store'
import { get } from 'svelte/store'
import { goto } from '$app/navigation'

export const load = async ({ locals }) => {
   const form = await superValidate(customerSchema)

   return {
      engineList: await getEngineList(locals),
      form

   }
}

export const actions = {
   create: async ({ request, locals }) => {
      const form = await superValidate(request, customerSchema)

      if (!form.valid) {
         console.log('NOT VALID: ', form);
         return fail(400, { form })
      }

      try {
         await locals.pb.collection('customers').create(form.data)
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
      const { id } = Object.fromEntries(formData)

      // const form = await superValidate(request, customerSchema) -- old
      const form = await superValidate(formData, customerSchema)

      if (!form.valid) {
         console.log('NOT VALID: ', form);
         return fail(400, { form })
      }

      try {
         /**
          * it feels wasting time to check form data is equal to curent data.
          *  will remove this or find the new better way
          */

         await locals.pb.collection('customers').update(id, form.data)
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