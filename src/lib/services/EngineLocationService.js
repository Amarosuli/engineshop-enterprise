import { Method, Table } from './DatabaseService';

export class EngineLocationService {
	name = 'EngineLocation';
	constructor(dbClient) {
		Object.assign(this, new Method(dbClient, Table.EngineLocation));
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
	 * database.EngineEngineLocationService.create( data)
	 *
	 * Update Example
	 * database.EngineEngineLocationService.update( id, data)
	 *
	 * Delete Example
	 * database.EngineEngineLocationService.delete( id)
	 */
}
