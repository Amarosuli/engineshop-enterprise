import { CommonHelpers } from '$lib/utils/CommonHelpers';

export const handle = async ({ event, resolve }) => {
   event.locals.pb = CommonHelpers.pb;
   event.locals.pb.autoCancellation(false); // globally disable auto cancellation
   event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

   try {
      if (event.locals.pb.authStore.isValid) {
         await event.locals.pb.collection('users').authRefresh();
         event.locals.user = event.locals.pb.authStore.model;
      }
   } catch (_) {
      event.locals.pb.authStore.clear();
      event.locals.user = undefined;
   }

   const res = await resolve(event);
   res.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));

   return res;
};
