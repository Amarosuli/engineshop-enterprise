import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';

import { CommonHelpers } from '$lib/utils/CommonHelpers';

export const load = async ({ locals }) => {
   let test = await locals.pb.collection('EngineHistory').getFullList({ filter: 'HistoryNumber=1' })
   console.log(test)
   let engineList = async () => {
      /**
       * add 'model' and 'customer key to array
       * value from the expand relation ( expand.model_id.name, expand.customer_id.name )
       */
      let raw = await CommonHelpers.getEngineList(locals);
      let engineModels = raw.map((value) => ({ ...value, model: value?.expand?.model_id?.name, customer: value?.expand?.customer_id?.name }));
      return engineModels;
   };
   return {
      form: await superValidate(CommonHelpers.engineListSchema),
      engineList: await engineList(),
      engineModels: await CommonHelpers.getEngineModels(locals),
      customers: await CommonHelpers.getCustomers(locals)
   };
};

export const actions = {
   create: async ({ request, locals }) => {
      /**
       * create actions of engine-list have 3 task
       * pre - check if esn is already exist
       * 1. create data to engine_list
       * pre - no check, if the first data not exist it means new
       * 2. create data to engine_availability (always assumed new engine is engine incoming)
       * pre - no check, if the first data not exist it means new
       * 3. create data to engine_location (with default position value)
       * if data in engine_list deleted, data in engine_availability and engine_location also removed
       */

      const form = await superValidate(request, CommonHelpers.engineListSchema);

      if (!form.valid) {
         console.log('NOT VALID: ', form);
         return fail(400, { form });
      }

      // pre[1] - Checking
      try {
         let isExist = await CommonHelpers.findByFilter(locals, 'engine_list', 'esn="' + form.data.esn + '"');
         if (isExist) {
            form.errors = {
               esn: 'This Engine Data Already Exist'
            };
            return fail(400, { form });
         }
      } catch (_) {
         // console.log('::NOTEXIST::\n', _);
      }

      try {
         let { id } = await CommonHelpers.createData(locals, 'engine_list', form.data); // [1] - Create
         // pre[2]
         let engineAvailabilityData = { engine_id: id, date_performed: new Date(), status: 'INCOMING' };
         await CommonHelpers.createData(locals, 'engine_availability', engineAvailabilityData); // [2]
         // pre[3]
         let engineLocationData = {
            engine_id: id,
            position: null,
            location: ''
         };
         await CommonHelpers.createData(locals, 'engine_location', engineLocationData); // [3]
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
      const form = await superValidate(formData, CommonHelpers.engineListSchema);

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
         await CommonHelpers.updateData(locals, 'engine_list', id, form.data);
      } catch (error) {
         form.errors = {
            pocketbaseErrors: `${error.response.message}!, crosscheck the ID or Password, or maybe your ID is actually not registered yet :)`
         };
         return fail(error.status, { form });
      }

      return { form };
   },
   delete: async ({ request, locals }) => {
      const form = Object.fromEntries(await request.formData());
      const keys = Object.keys(form);
      console.log(keys.length);

      keys.forEach(async (k, index) => {
         // NOTE: Postpone, redirect, goto, standard headers are not working to reload page.

         let id = form[k];
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
      });
   }
};
