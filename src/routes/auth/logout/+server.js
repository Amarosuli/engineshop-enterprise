import { redirect } from '@sveltejs/kit';

export const GET = async ({ locals }) => {
   if (!locals.pb.authStore.model) return;
   try {
      await locals.pb.authStore.clear();
   } catch (_) { }

   throw redirect(303, '/');
};
