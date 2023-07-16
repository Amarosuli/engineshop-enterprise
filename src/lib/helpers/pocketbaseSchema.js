import { CPOJOs } from '$lib/utils/func'

export const getFullList = async (pbClient, collectionName) => {
   let result = await pbClient.pb.collection(collectionName).getFullList({
      sort: '-created',
   })
   // console.log(`RESULT OF GETFULLLIST (${collectionName}):`, result);
   return CPOJOs(result)
}

export const getEngineFamily = async (locals) => {
   return await getFullList(locals, 'engine_family')
}