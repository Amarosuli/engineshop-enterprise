import { CommonHelpers } from '$lib/utils/CommonHelpers'

export const load = async ({ locals }) => {
   return { user: CommonHelpers.CPOJOs(await locals.pb.authStore.model) }
}