import { error, json } from "@sveltejs/kit";

export async function POST({ request, locals }) {
   let form = await request.formData()
   let id = form.get('id')
   let data = {
      isBeingUsed: form.get('isBeingUsed')
   }

   try {
      await locals.pb.collection('engine_location').update(id, data)
   } catch (error) {
      return json({ success: false, error })
   }
   return json({ success: true })

}