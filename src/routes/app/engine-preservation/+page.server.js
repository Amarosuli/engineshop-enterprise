import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';

import { CommonHelpers } from '$lib/utils/CommonHelpers';

/**
 * Show Engine available only (client side control by table plugin) (for now is filter by server)
 * Engine with isPreservable === False set different background
 * Engine with no data preservation is valued by "No Data"
 */
export const load = async ({ locals }) => {
   let preservationHistory = async () => { return await locals.pb.collection('preservation_history').getFullList() }
   let engineList = async () => {
      /**
       * add 'model' and 'customer key to array
       * value from the expand relation ( expand.model_id.name, expand.customer_id.name )
       */
      let raw = await CommonHelpers.getEngineList(locals);
      let history = await preservationHistory()
      // let filterAvailability = raw.filter(({ isAvailable }) => isAvailable);
      let addModelandCustomer = raw.map((value) => ({ ...value, model: value?.expand?.model_id?.name, customer: value?.expand?.customer_id?.name }));
      let addPreserveDetail = addModelandCustomer.map((value) => ({ ...value, preserveDetail: history.find(({ engine_id, history_number }) => history_number === 1 && engine_id === value.id) || {} }));
      return addPreserveDetail;
   };
   return {
      form: await superValidate(CommonHelpers.enginePreservationSchema),
      engineList: await engineList(),
      engineModels: await CommonHelpers.getEngineModels(locals),
      customers: await CommonHelpers.getCustomers(locals)
   };
};

export const actions = {
   create: async ({ request, locals }) => {
      const form = await superValidate(request, CommonHelpers.enginePreservationSchema);

      if (!form.valid) {
         console.log('NOT VALID: ', form);
         return fail(400, { form });
      }

      try {
         await CommonHelpers.createData(locals, 'preservation_list', form.data);
      } catch (error) {
         form.errors = {
            pocketbaseErrors: `${error.response.message}!, crosscheck the ID or Password, or maybe your ID is actually not registered yet :)`
         };
         return fail(error.status, { form });
      }
      // console.log('VALID: ', form);

      return { form };
   },
   update: async ({ request, locals }) => {
      /**
       * grab raw form data into formData variable,
       * so we can get the data from input id (hidden) which is not include in the zod schema
       * then formData pass into superValidate to validate what necessary
       */
      const formData = await request.formData();
      const form = await superValidate(formData, CommonHelpers.enginePreservationSchema);

      if (!form.valid) {
         console.log('NOT VALID: ', form);
         return fail(400, { form });
      }

      const id = formData.get('id');

      try {
         /**
          * it feels wasting time to check form data is equal to curent data.
          *  will remove this or find the new better way
          */
         await CommonHelpers.updateData(locals, 'preservation_list', id, form.data);
      } catch (error) {
         form.errors = {
            pocketbaseErrors: `${error.response.message}!, crosscheck the ID or Password, or maybe your ID is actually not registered yet :)`
         };
         return fail(error.status, { form });
      }

      return { form };
   }
};
