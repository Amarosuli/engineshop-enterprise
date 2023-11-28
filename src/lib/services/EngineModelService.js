import { Method, Table } from './DatabaseService';

export class EngineModelService {
	// name = 'EngineModel'
	constructor(dbClient) {
		Object.assign(this, new Method(dbClient, Table.EngineModel));
		this.dbClient = dbClient;
	}
	getAll = async (options) => {
		return await this.getFullList(options);
	};
	getById = async (id) => {
		return await this.findByFilter('id="' + id + '"');
	};

	/**
	 * Create Example
	 * database.EngineModelService.create( data)
	 *
	 * Update Example
	 * database.EngineModelService.update( id, data)
	 *
	 * Delete Example
	 * database.EngineModelService.delete( id)
	 */
}
