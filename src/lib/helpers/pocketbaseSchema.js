import { CPOJOs } from '$lib/utils/func'
import { PUBLIC_API_PB } from '$env/static/public'

export const getFile = (collectionId, recordId, fileName, thumb = '0x0') => {
   let url = `${PUBLIC_API_PB}/api/files/${collectionId}/${recordId}/${fileName}?thumb=${thumb}`
   return url
}

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

export const getCustomers = async (locals) => {
   return await getFullList(locals, 'customers')
}

export const getEngineList = async (locals) => {
   const options = { expand: 'model_id,customer_id' }
   return await getFullList(locals, 'engine_list', options)
}