import { CommonHelpers } from '$lib/utils/CommonHelpers';

export const load = async ({ locals }) => {
	const getUnit = async () => {
		let id = locals.pb.authStore.model.unit_id;
		return CommonHelpers.CPOJOs(await locals.pb.collection('units').getOne(id));
	};
	return {
		unit: getUnit()
	};
};
