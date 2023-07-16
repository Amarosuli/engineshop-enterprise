import { getEngineFamily } from '$lib/helpers/pocketbaseSchema'

export const load = async ({ locals }) => {
   // console.log(await getEngineFamily(locals));
   return {
      engineFamily: await getEngineFamily(locals)
   }
}