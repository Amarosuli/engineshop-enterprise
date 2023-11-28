import { Method, Table } from './DatabaseService';

export class PreservationService {
	// name = 'Preservation'
	constructor(dbClient) {
		Object.assign(this, new Method(dbClient, Table.Preservation));
		this.dbClient = dbClient;
	}
	getAll = async (options) => {
		return await this.getFullList(options);
	};
	getById = async (id) => {
		return await this.findByFilter('id="' + id + '"');
	};
	getHistory = async () => {
		return await this.dbClient.collection('preservation_history').getFullList();
	};
	getEngineList = async () => {
		let engine = await this.dbClient.collection('engine_list').getFullList({ sort: '-created', expand: 'model_id,customer_id' });
		let engineHistory = await this.dbClient.collection('engine_history').getFullList();
		let preservationHistory = await this.getHistory();

		let result = engine.map((value) => ({
			...value,
			model: value?.expand?.model_id?.name,
			customer: value?.expand?.customer_id?.name,
			isAvailable: engineHistory.find((h) => h.history_number == 1 && h.engine_id == value.id),
			preserveDetail: preservationHistory.find((h) => h.history_number === 1 && h.engine_id === value.id) || {}
		}));

		return result;
	};

	/**
	 * Create Example
	 * database.EnginePreservationService.create( data)
	 *
	 * Update Example
	 * database.EnginePreservationService.update( id, data)
	 *
	 * Delete Example
	 * database.EnginePreservationService.delete( id)
	 */
}
