import { CPOJOs } from '$lib/utils/func'

export const getFullList = async (pbClient, collectionName, options) => {
   let result = await pbClient.pb.collection(collectionName).getFullList({
      sort: '-created',
      ...options
   })
   // console.log(`RESULT OF GETFULLLIST (${collectionName}):`, result);
   return CPOJOs(result)
}

export const getEngineFamilies = async (locals) => {
   return await getFullList(locals, 'engine_families')
}

export const getEngineModels = async (locals) => {
   const options = { expand: 'family_id' }
   return await getFullList(locals, 'engine_models', options)
}