import { Method, Table } from './DatabaseService';

export class EngineService {
	name = 'Engine';
	constructor(dbClient) {
		Object.assign(this, new Method(dbClient, Table.Engine));
		this.dbClient = dbClient;
	}
	getAll = async (options) => {
		return await this.getFullList(options);
	};
	getById = async (id) => {
		return await this.findByFilter('id="' + id + '"');
	};
	getByEsn = async (esn) => {
		let result = await this.findByFilter('esn="' + esn + '"');
		if (result.message === 'failed') return false;
		return result;
	};
	getEngineList = async () => {
		let engine = await this.getAll({ expand: 'model_id,customer_id' });
		let engineHistory = await this.dbClient.collection('engine_history').getFullList();

		let result = engine.map((value) => ({
			...value,
			model: value?.expand?.model_id?.name,
			customer: value?.expand?.customer_id?.name,
			isAvailable: engineHistory.find((h) => h.history_number == 1 && h.engine_id == value.id)
		}));

		return result;
	};

	/**
	 * Create Example
	 * database.EngineService.create( data)
	 *
	 * Update Example
	 * database.EngineService.update( id, data)
	 *
	 * Delete Example
	 * database.EngineService.delete( id)
	 */
}
