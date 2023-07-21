import { superValidate } from 'sveltekit-superforms/server';
import { getCustomers } from '$lib/helpers/pocketbaseSchema'
import { customerSchema } from '$lib/helpers/zodSchema'
import { fail, redirect } from '@sveltejs/kit';
import { _row } from '$lib/utils/store'
export const load = async ({ locals }) => {
   const form = await superValidate(customerSchema)

   return {
      customers: await getCustomers(locals),
      form

   }
}

export const actions = {
   create: async ({ request, locals }) => {
      // grab formData to send to pocketbase API
      const formData = await request.formData()
      // then formData pass into superValidate so superform will do the validation process
      const form = await superValidate(formData, customerSchema)

      if (!form.valid) {
         console.log('NOT VALID: ', form);
         return fail(400, { form })
      }

      try {
         /**
          * pocketbase use enctype="multipart/form-data" into form
          * and file from input auto detect only if the data pass into props of API is formData
          * so superform only work for the validation not for the final data to send to the API
          * and use the formData() that already grabbed into const formData variable.
          */
         await locals.pb.collection('customers').create(formData)
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
      // grab formData to send to pocketbase API
      const formData = await request.formData()
      // get the id
      const id = formData.get('id')
      // get the logo for checking
      const logo = formData.get('logo')
      // then formData pass into superValidate so superform will do the validation process
      const form = await superValidate(formData, customerSchema)

      if (!form.valid) {
         console.log('NOT VALID: ', form);
         return fail(400, { form })
      }

      try {
         /**
          * if no image, delete the key
          * so pocketbase not remove the curent image in pocketbase
         */

         if (logo.size === 0) {
            formData.delete('logo')
         }

         await locals.pb.collection('customers').update(id, formData)
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