import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';

import { _row } from '$lib/utils/Stores';
import { CommonHelpers } from '$lib/utils/CommonHelpers';


export const load = async ({ locals }) => {
   return {
      pdfTemplates: await CommonHelpers.getPDFTemplates(locals),
      form: await superValidate(CommonHelpers.pdfTemplateSchema)
   };
};

export const actions = {
   create: async ({ request, locals }) => {
      const formData = await request.formData();
      const form = await superValidate(formData, CommonHelpers.pdfTemplateSchema);

      if (!form.valid) {
         console.log('NOT VALID: ', form);
         return fail(400, { form });
      }

      const pdf = formData.get('pdf');

      try {

         if (pdf.size === 0) formData.delete('pdf');
         await CommonHelpers.createData(locals, 'pdf_templates', formData);
      } catch (error) {
         form.errors = {
            pocketbaseErrors: `${error.response.message}!, crosscheck the ID or Password, or maybe your ID is actually not registered yet :)`
         };
         return fail(error.status, { form });
      }

      return { form };
   },
   update: async ({ request, locals }) => {
      const formData = await request.formData();
      const form = await superValidate(formData, CommonHelpers.customerSchema);

      if (!form.valid) {
         console.log('NOT VALID: ', form);
         return fail(400, { form });
      }

      const id = formData.get('id');
      const logo = formData.get('logo');

      try {
         /**
          * if no id, return fail
          * if no image, delete the key (prevent pocketbase remove the curent image in database)
          */
         if (logo.size === 0) formData.delete('logo');
         await CommonHelpers.updateData(locals, 'customers', id, formData);
      } catch (error) {
         form.errors = {
            pocketbaseErrors: `${error.response.message}!, crosscheck the ID or Password, or maybe your ID is actually not registered yet :)`
         };
         return fail(error.status, { form });
      }

      return { form };
   },
   confirm: async ({ request, locals }) => {
      console.log('confirm success')
      console.log('delete process')
      console.log('delete success')
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