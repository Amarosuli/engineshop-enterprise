import { Method, Table } from './DatabaseService';

export class CustomerService {
	name = 'Customer';
	constructor(dbClient) {
		Object.assign(this, new Method(dbClient, Table.Customer));
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
	 * database.EngineCustomerService.create( data)
	 *
	 * Update Example
	 * database.EngineCustomerService.update( id, data)
	 *
	 * Delete Example
	 * database.EngineCustomerService.delete( id)
	 */
}
