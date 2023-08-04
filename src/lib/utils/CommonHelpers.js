import { z } from 'zod'
import PocketBase from 'pocketbase'
import { PUBLIC_API_PB } from '$env/static/public'

export class CommonHelpers {
   static pb = new PocketBase(PUBLIC_API_PB)

   /**
    * Function to convert data from pocketbase api
    * to usable object format
    */
   static CPOJOs = async (obj) => {
      return await structuredClone(obj)
   }

   /**
    * Function to generate random of hex color
    */
   static randomHexColor = () => {
      let n = (Math.random() * 0xfffff * 1000000).toString(16);
      return '#' + n.slice(0, 6);
   };

   /**
    * Function to handle escape button
    */
   static escHandler = (e) => {
      if (!e) {
         return;
      }

      if (e.keyCode === 27) {
         // _modalHide(id);
      }
   };


   /** Zod Schemas */
   static LoginSchema = z.object({
      username: z.string().trim().min(6, { message: 'Employee Id cannot be empty, minimum 6 number' }), // username is employee id
      password: z.string().trim().min(8, { message: 'Password cannot be empty, minimum 8 character' })
   })

   static engineFamilySchema = z.object({
      name: z.string().min(1, { message: 'Family Name cannot be empty' }),
      description: z.string().optional(),
   })

   static engineModelSchema = z.object({
      name: z.string().min(1, { message: 'Model Name cannot be empty' }),
      description: z.string().optional(),
      family_id: z.string()
   })
   static customerSchema = z.object({
      name: z.string().min(1, { message: 'Customer Name cannot be empty' }),
      description: z.string().optional(),
      // logo: z.any().optional(), // still need for populating update form
      code_IATA: z.string().optional(),
      code_ICAO: z.string().optional(),
   })

   static engineListSchema = z.object({
      esn: z.string().min(1, { message: 'Engine Serial Number cannot be empty' }),
      config: z.string().optional(),
      model_id: z.string().min(1, { message: 'Model cannot be empty' }),
      customer_id: z.string().min(1, { message: 'Customer cannot be empty' }),
      isAvailable: z.boolean().default(true),
      isServiceable: z.boolean().default(false),
      isPreservable: z.boolean().default(true),
      notes: z.string().optional()
   })

   static engineAvailabilitySchema = z.object({
      date_in: z.date(),
      date_out: z.date().optional(),
      isInShop: z.boolean().default(true)
   })


   /** Pocketbase Schemas @GET */
   static getFileUrl = (collectionId, recordId, fileName, thumb = '0x0') => {
      let url = `${PUBLIC_API_PB}/api/files/${collectionId}/${recordId}/${fileName}?thumb=${thumb}`
      return url
   }

   static getFullList = async (pbClient, collectionName, options) => {
      let result = await pbClient.pb.collection(collectionName).getFullList({
         sort: '-created',
         ...options
      })
      // console.log(`RESULT OF GETFULLLIST (${collectionName}):`, result);
      return this.CPOJOs(result)
   }

   static getEngineFamilies = async (pbClient) => {
      return await this.getFullList(pbClient, 'engine_families')
   }

   static getEngineModels = async (pbClient) => {
      const options = { expand: 'family_id' }
      return await this.getFullList(pbClient, 'engine_models', options)
   }

   static getCustomers = async (pbClient) => {
      return await this.getFullList(pbClient, 'customers')
   }

   static getEngineList = async (pbClient) => {
      const options = { expand: 'model_id,customer_id' }
      return await this.getFullList(pbClient, 'engine_list', options)
   }

   static getEngineAvailability = async (pbClient) => {
      const options = { expand: 'engine_id' }
      return await this.getFullList(pbClient, 'engine_availability', options)
   }

   static getPreservationList = async (pbClient) => {
      return await this.getFullList(pbClient, 'preservation_list')
   }

   /** Pocketbase Schemas @POST */
   static createData = async (pbClient, tableName, data) => {
      return await pbClient.pb.collection(tableName).create(data)
   }

   static updateData = async (pbClient, tableName, id, data) => {
      return await pbClient.pb.collection(tableName).update(id, data)
   }


}