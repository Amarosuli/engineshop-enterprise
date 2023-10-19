import { z } from 'zod';
import PocketBase from 'pocketbase';
import { PUBLIC_API_PB } from '$env/static/public';


/**
 * CommonHelpers is someset of utility
 */
export class CommonHelpers {
   static pb = new PocketBase(PUBLIC_API_PB);

   /**
    * @deprecated since the pocketbase change the return value
    * Function to convert data from pocketbase api
    * to usable object format
    */
   // static CPOJOs = async (obj) => {
   //    return await structuredClone(obj);
   // };

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

   /**
    * clickOutSide
    * I dont understand, why the use 'const handleClick = e => ...' cause the browser notify the CostumEvent undefined
    * But when use the explicit 'const handleClick = event => ...', it will work
    */

   static clickOutside(node) {
      const handleClick = (event) => {
         if (node && !node.contains(event.target) && !event.defaultPrevented) {
            node.dispatchEvent(new CustomEvent('click_outside', node));
         }
      };

      document.addEventListener('click', handleClick, true);

      return {
         destroy() {
            document.removeEventListener('click', handleClick, true);
         }
      };
   };

   static mergeObject = (objTarget, objSource) => {
      Object.keys(objTarget).forEach((key) => {
         objTarget[key] = objSource[key] || '';
      });
   };



   static resetObject = (obj, options = { exclude: [] }) => {
      Object.keys(obj).forEach((key) => {
         if (options && options.exclude.length && options.exclude.includes(key)) return;
         obj[key] = '';
      });
   };

   /** Zod Schemas */
   static LoginSchema = z.object({
      username: z.string().trim().min(6, { message: 'Employee Id cannot be empty, minimum 6 number' }), // username is employee id
      password: z.string().trim().min(8, { message: 'Password cannot be empty, minimum 8 character' })
   });

   static engineFamilySchema = z.object({
      name: z.string().min(1, { message: 'Family Name cannot be empty' }),
      description: z.string().optional()
   });

   static engineModelSchema = z.object({
      name: z.string().min(1, { message: 'Model Name cannot be empty' }),
      description: z.string().optional(),
      family_id: z.string()
   });
   static customerSchema = z.object({
      name: z.string().min(1, { message: 'Customer Name cannot be empty' }),
      description: z.string().optional(),
      // logo: z.any().optional(), // still need for populating update form
      code_IATA: z.string().optional(),
      code_ICAO: z.string().optional()
   });

   static engineListSchema = z.object({
      esn: z.string().min(1, { message: 'Engine Serial Number cannot be empty' }),
      config: z.string().optional(),
      model_id: z.string().min(1, { message: 'Model cannot be empty' }),
      customer_id: z.string().min(1, { message: 'Customer cannot be empty' }),
      isServiceable: z.boolean().default(false),
      isPreservable: z.boolean().default(true),
      notes: z.string().optional()
   });

   static engineAvailabilitySchema = z.object({
      engine_id: z.string().min(1, { message: 'Engine Id cannot be empty' }),
      date_in: z.date(),
      date_out: z.date().optional(),
      isInShop: z.boolean().default(true)
   });

   static enginePreservationSchema = z.object({
      engine_id: z.string().min(1, { message: 'Engine Id cannot be empty' }),
      duration: z.string().min(1, { message: 'Duration cannot be empty' }),
      date_performed: z.date().default(new Date()),
      tag: z.any().optional(),
      material: z.string().optional()
   });

   static pdfTemplateSchema = z.object({
      name: z.string().min(1, { message: 'Template Name cannot be empty' }),
      alias: z.string().optional(),
      description: z.string().optional(),
      base64: z.string().min(1, { message: 'Base64 cannot be empty' }),
      // pdf: z.any().optional(), // still need for populating update form   
      schema: z.string(),
   })

   static createPdfTemplateSchema = z.object({
      id: z.string().min(1, { message: 'Template Name cannot be empty' }),
      // name: z.string().min(1, { message: 'Template Name cannot be empty' }),
      // alias: z.string().optional(),
      // description: z.string().optional(),
      base64: z.string().optional(),
      // pdf: z.any().optional(), // still need for populating update form   
      schema: z.string(),
   })

   static createSPSchema = z.object({
      template_id: z.string().min(1, { message: 'Template Name cannot be empty' }),
      shipment_date: z.date().default(new Date),
      shipper_name: z.string().min(1, { message: 'Template Name cannot be empty' }),
      shipper_id: z.string().min(1, { message: 'Template Name cannot be empty' }),
      shipper_unit: z.string().min(1, { message: 'Template Name cannot be empty' }),
      recipient_name: z.string().min(1, { message: 'Template Name cannot be empty' }),
      recipient_id: z.string().min(1, { message: 'Template Name cannot be empty' }),
      recipient_unit: z.string().min(1, { message: 'Template Name cannot be empty' }),
      data: z.string(),
   })

   /** Pocketbase Schemas @GET */
   static getFileUrl = (collectionId, recordId, fileName, thumb = '0x0') => {
      let url = `${PUBLIC_API_PB}/api/files/${collectionId}/${recordId}/${fileName}?thumb=${thumb}`;
      return url;
   };

   static getFullList = async (pbClient, collectionName, options) => {
      let result = await pbClient.pb.collection(collectionName).getFullList({
         sort: '-created',
         ...options
      });
      // console.log(`RESULT OF GETFULLLIST (${collectionName}):`, result);
      // return this.CPOJOs(result);
      return result
   };

   /**
    *
    * @param {*} pbClient
    * @param {String} collectionName
    * @param {String} filter
    */
   static findByFilter = async (pbClient, collectionName, filter) => {
      // issue? filter with template literals error output string.
      return await pbClient.pb.collection(collectionName).getFirstListItem(filter);
   };

   static getEngineFamilies = async (pbClient) => {
      return await this.getFullList(pbClient, 'engine_families');
   };

   static getEngineModels = async (pbClient) => {
      const options = { expand: 'family_id' };
      return await this.getFullList(pbClient, 'engine_models', options);
   };

   static getCustomers = async (pbClient) => {
      return await this.getFullList(pbClient, 'customers');
   };

   static getEngineList = async (pbClient) => {
      const options = { expand: 'model_id,customer_id' };
      return await this.getFullList(pbClient, 'engine_list', options);
   };

   static getEngineAvailability = async (pbClient) => {
      const options = { expand: 'engine_id' };
      return await this.getFullList(pbClient, 'engine_availability', options);
   };

   static getPreservationList = async (pbClient) => {
      return await this.getFullList(pbClient, 'preservation_list');
   };

   static getEngineLocation = async (pbClient) => {
      return await this.getFullList(pbClient, 'engine_location');
   };

   static getPDFTemplates = async (pbClient) => {
      return await this.getFullList(pbClient, 'pdf_templates');
   };

   static getEngineHistory = async (pbClient) => {
      // return await this.getFullList(pbClient, 'engine_history');
      return await pbClient.pb.collection('engine_history').getFullList({ expand: 'engine_id' })
   };

   /** Pocketbase Schemas @POST */
   static createData = async (pbClient, tableName, data) => {
      return await pbClient.pb.collection(tableName).create(data);
   };

   static updateData = async (pbClient, tableName, id, data) => {
      return await pbClient.pb.collection(tableName).update(id, data);
   };


}
