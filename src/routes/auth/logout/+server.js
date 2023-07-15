import { redirect } from '@sveltejs/kit'

export const GET = async ({ locals }) => {
   if (!locals.pb.authStore.model) return
   try {
      await locals.pb.authStore.clear()
   } catch (error) {
      console.log('Error: ', error);
   }

   throw redirect(303, '/')
}