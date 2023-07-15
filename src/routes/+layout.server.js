import { CPOJOs } from '$lib/utils/func'

export const load = async ({ locals }) => {
   return { user: CPOJOs(await locals.pb.authStore.model) }
}