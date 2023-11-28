import { Method, Table } from './DatabaseService';

export class EngineAvailabilityService {
	name = 'EngineAvailability';
	constructor(dbClient) {
		Object.assign(this, new Method(dbClient, Table.EngineAvailability));
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
	 * database.EngineEngineAvailabilityService.create( data)
	 *
	 * Update Example
	 * database.EngineEngineAvailabilityService.update( id, data)
	 *
	 * Delete Example
	 * database.EngineEngineAvailabilityService.delete( id)
	 */
}
