import { CommonHelpers } from '$lib/utils/CommonHelpers';
import { DBService, ServiceToPath } from '$lib/services';

export const handle = async ({ event, resolve }) => {
	event.locals.pb = CommonHelpers.pb;
	event.locals.pb.autoCancellation(false); // globally disable auto cancellation
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	/**
	 * @TODO
	 * I want to register service here by check the event.route
	 * So in each +page.server, i dont have to run serviceRegister
	 * Both in Load function or Action function
	 */
	event.database = DBService.createClient(event.locals.pb);

	if (event.url.pathname !== '/' || event.url.pathname === undefined) {
		let path = event.url.pathname.split('/').pop();
		let serviceExist = Object.keys(ServiceToPath).includes(path);

		if (serviceExist) {
			ServiceToPath[path].forEach((service) => {
				event.database.ServiceRegister(service);
			});
		}
	}

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
