import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';

import { CommonHelpers } from '$lib/utils/CommonHelpers'

/**
 * Show Engine available only (client side control by table plugin) (for now is filter by server)
 * Engine with isPreservable === False set different background
 * Engine with no data preservation is valued by "No Data"
 */
export const load = async ({ locals }) => {
   let engineList = async () => {
      /**
       * add 'model' and 'customer key to array
       * value from the expand relation ( expand.model_id.name, expand.customer_id.name )
       */
      let raw = await CommonHelpers.getEngineList(locals)
      let filterAvailability = raw.filter(({ isAvailable }) => isAvailable)
      let result = filterAvailability.map(value => ({ ...value, model: value?.expand?.model_id?.name, customer: value?.expand?.customer_id?.name }))
      return result
   }
   return {
      form: await superValidate(CommonHelpers.enginePreservationSchema),
      preservationList: await CommonHelpers.getPreservationList(locals),
      engineList: await engineList(),
      engineModels: await CommonHelpers.getEngineModels(locals),
      customers: await CommonHelpers.getCustomers(locals)

   }
}

export const actions = {
   create: async ({ request, locals }) => {
      const form = await superValidate(request, CommonHelpers.enginePreservationSchema)

      if (!form.valid) {
         console.log('NOT VALID: ', form);
         return fail(400, { form })
      }

      try {
         await CommonHelpers.createData(locals, 'preservation_list', form.data)
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
      const form = await superValidate(formData, CommonHelpers.enginePreservationSchema)

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
      console.log(form);
   }
};