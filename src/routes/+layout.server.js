import { CPOJOs } from '$lib/utils/func'

export const load = async ({ locals }) => {
   console.log('user:', await locals.pb.authStore.model);
   return { user: CPOJOs(await locals.pb.authStore.model) }
}