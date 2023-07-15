import { CPOJOs } from '$lib/utils/func'

export const load = async ({ locals }) => {
   const getUnit = async () => {
      let id = locals.pb.authStore.model.unit
      return CPOJOs(await locals.pb.collection('units').getOne(id))
   }
   return {
      unit: getUnit(),
   }
}