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
      customers: await CommonHelpers.getCustomers(locals),
      preservationHistory: await preservationHistory()
   };
};

export const actions = {
   create: async ({ request, locals }) => {
      const formData = await request.formData()
      const form = await superValidate(formData, CommonHelpers.enginePreservationSchema);

      if (!form.valid) {
         console.log('NOT VALID: ', form);
         return fail(400, { form });
      }

      const tag = formData.get('tag')

      try {
         if (tag.size === 0) formData.delete('tag')
         await CommonHelpers.createData(locals, 'preservation_list', formData);
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
      const formData = await request.formData();
      const form = await superValidate(formData, CommonHelpers.enginePreservationSchema);

      if (!form.valid) {
         console.log('NOT VALID: ', form);
         return fail(400, { form });
      }

      const id = formData.get('id');
      const tag = formData.get('tag')

      try {
         if (tag.size === 0) formData.delete('tag')
         await CommonHelpers.updateData(locals, 'preservation_list', id, formData);
      } catch (error) {
         form.errors = {
            pocketbaseErrors: `${error.response.message}!, crosscheck the ID or Password, or maybe your ID is actually not registered yet :)`
         };
         return fail(error.status, { form });
      }

      return { form };
   }
};
