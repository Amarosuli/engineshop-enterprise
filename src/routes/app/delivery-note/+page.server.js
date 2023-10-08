import { superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';

import { _row } from '$lib/utils/Stores';
import { CommonHelpers } from '$lib/utils/CommonHelpers';


export const load = async ({ locals, url }) => {

   return {
      // pdfTemplates: await CommonHelpers.findByFilter(locals, 'pdf_templates', `id="${id}"`),
      form: await superValidate(CommonHelpers.createPdfTemplateSchema)
   };
};

/** @type {import('./$types').Actions} */
export const actions = {
   createTemplate: async ({ request, locals }) => {
      const form = await superValidate(request, CommonHelpers.createPdfTemplateSchema)

      if (!form.valid) {
         console.log('NOT VALID: ', form);
         return fail(400, { form });
      }

      try {
         /**
          * it feels wasting time to check form data is equal to curent data.
          *  will remove this or find the new better way
          */
         let { schema, id, base64 } = form.data
         let data = { base64, schema }
         await CommonHelpers.updateData(locals, 'pdf_templates', id, data);
      } catch (error) {
         form.errors = {
            pocketbaseErrors: `${error.response.message}!, crosscheck the ID or Password, or maybe your ID is actually not registered yet :)`
         };
         return fail(error.status, { form });
      }

      return { form }
   }
};