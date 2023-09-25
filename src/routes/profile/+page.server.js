import { CommonHelpers } from '$lib/utils/CommonHelpers';

export const load = async ({ locals }) => {
   const getUnit = async () => {
      let unit_id = locals.user.unit_id;
      return await locals.pb.collection('units').getOne(unit_id)
   };
   const getRole = async () => {
      let role_id = locals.user.role_id;
      return await locals.pb.collection('user_roles').getOne(role_id)
   };
   return {
      unit: getUnit(),
      role: getRole()
   };
};
