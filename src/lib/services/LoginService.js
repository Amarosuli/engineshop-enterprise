import { Method, Table } from './DatabaseService';

export class LoginService {
	name = 'Login';
	constructor(dbClient) {
		Object.assign(this, new Method(dbClient, Table.User));
		this.dbClient = dbClient;
	}
	getAll = async (options) => {
		return await this.getFullList(options);
	};
	getByUsername = async (id) => {
		return await this.findByFilter('id="' + id + '"');
	};
	login = async (username, password) => {
		try {
			await this.dbClient.collection(this.collectionName).authWithPassword(username, password);
		} catch (error) {
			return { status: error.status, message: 'failed' };
		}
		return { message: 'success' };
	};
}
