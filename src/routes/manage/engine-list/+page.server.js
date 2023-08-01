import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';

import { _row } from '$lib/utils/store'
import { CommonHelpers } from '$lib/utils/CommonHelpers'

export const load = async ({ locals }) => {
   let engineList = async () => {
      /**
       * add 'model' and 'customer key to array
       * value from the expand relation ( expand.model_id.name, expand.customer_id.name )
       */
      let raw = await CommonHelpers.getEngineList(locals)
      let engineModels = raw.map(value => ({ ...value, model: value?.expand?.model_id?.name, customer: value?.expand?.customer_id?.name }))
      return engineModels
   }
   return {
      form: await superValidate(CommonHelpers.engineListSchema),
      engineList: await engineList(),
      engineModels: await CommonHelpers.getEngineModels(locals),
      customers: await CommonHelpers.getCustomers(locals)

   }
}

export const actions = {
   create: async ({ request, locals }) => {
      const form = await superValidate(request, CommonHelpers.engineListSchema)

      if (!form.valid) {
         console.log('NOT VALID: ', form);
         return fail(400, { form })
      }

      /**
       * create actions of engine-list have two task
       * 1. create data to engine_list
       * 2. create data to engine_availability (assumed new engine is engine incoming)
       * if data in engine_list deleted, data in engine_availability also removed
       */
      try {
         // 1. create data to engine_list, then get the id from result
         // let { id } = await locals.pb.collection('engine_list').create(form.data)
         let { id } = await CommonHelpers.createData(locals, 'engine_list', form.data)
         // 2. create new object for create data to engine_availability
         let engineAvailabilityData = { "engine_id": id, "date_in": new Date(), "isInShop": true }
         // await locals.pb.collection('engine_availability').create(engineAvailabilityData)
         await CommonHelpers.createData(locals, 'engine_availability', engineAvailabilityData)
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
       * so we can get the data from input id (hidden) which is not include in the zod schema
       * then formData pass into superValidate to validate what necessary
       */
      const formData = await request.formData()
      const form = await superValidate(formData, CommonHelpers.engineListSchema)

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
         await CommonHelpers.updateData(locals, 'engine_list', id, form.data)
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