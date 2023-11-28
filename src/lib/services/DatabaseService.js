import PocketBase from 'pocketbase';
import { PUBLIC_API_PB } from '$env/static/public';

export const Table = {
	User: 'users',
	EngineFamily: 'engine_families',
	EngineModel: 'engine_models',
	Customer: 'customers',
	Engine: 'engine_list',
	EngineAvailability: 'engine_availability',
	EngineLocation: 'engine_location',
	EngineHistory: 'engine_history',
	Preservation: 'preservation_list'
};

export class ResponseError {
	constructor(message) {
		this.message = '! ' + message;
		this.show = () => console.error(this.message);
	}
}

export class ResponseData {
	constructor(data, status, message) {
		this.response = () => {
			return {
				status: status,
				data: data,
				message: message
			};
		};
	}
}

export class Method {
	constructor(client, collectionName) {
		this.collectionName = collectionName;

		this.create = async (data) => {
			let result;
			try {
				result = await client.collection(this.collectionName).create(data);
			} catch (error) {
				return { status: error.status, detail: error.response.message, service: `${this.collectionName} - create`, message: 'failed' };
			}
			return { id: result.id, payload: result, service: `${this.collectionName} - create`, message: 'success' };
		};
		this.update = async (id, data) => {
			let result;
			try {
				result = await client.collection(this.collectionName).update(id, data);
			} catch (error) {
				return { status: error.status, detail: error.response.message, service: `${this.collectionName} - update`, message: 'failed' };
			}
			return { id: result.id, payload: result, service: `${this.collectionName} - update`, message: 'success' };
		};
		this.delete = async (id) => {
			let result;

			try {
				result = await client.collection(this.collectionName).delete(id);
			} catch (error) {
				return { status: error.status, detail: error.response.message, service: `${this.collectionName} - delete`, message: 'failed' };
			}
			return { id: result.id, payload: result, service: `${this.collectionName} - delete`, message: 'success' };
		};
		this.findByFilter = async (filter) => {
			let result;
			try {
				result = await client.collection(this.collectionName).getFirstListItem(filter);
			} catch (error) {
				return { status: error.status, detail: error.response.message, service: `${this.collectionName} - one`, message: 'failed' };
			}
			return result;
		};
		this.getFullList = async (options) => {
			let result;
			try {
				result = await client.collection(this.collectionName).getFullList({
					sort: '-created',
					...options
				});
			} catch (error) {
				return { status: error.status, detail: error.response.message, service: `${this.collectionName} - all`, message: 'failed' };
			}
			return result;
		};
		this.getFileUrl = (collectionId, recordId, fileName, thumb = '0x0') => {
			let url = `${PUBLIC_API_PB}/api/files/${collectionId}/${recordId}/${fileName}?thumb=${thumb}`;
			return url;
		};
	}
}

class Client {
	constructor(client) {
		Object.defineProperty(this, 'dbClient', {
			enumerable: false,
			value: client || new PocketBase(PUBLIC_API_PB)
		});
		this.serviceList = [];
	}

	ResponseResult() {
		return 'some costum result';
	}

	Log(data) {
		let template = `${data?.service} :: Result -> ${data.message}`;
		console.log(template);
	}

	ServiceRegister() {
		if (arguments.length === 0) return new ResponseError('No Service Registered');

		for (const key in arguments) {
			if (Object.hasOwnProperty.call(arguments, key)) {
				const service = arguments[key];
				const serviceName = service.name;
				this.serviceList.push(serviceName);
				this[serviceName] = new service(this.dbClient);
			}
		}
	}

	MethodRegister() {
		if (arguments.length === 0) return new ResponseError('No Service Registered');
		for (const key in arguments) {
			if (Object.hasOwnProperty.call(arguments, key)) {
				const method = arguments[key];
				const methodName = method.name;
				this[methodName] = (args) => {
					return new method(args);
				};
			}
		}
	}
}

/**
 * @component
 * DB Services is class to build database connection
 */
export class DBService {
	static createClient(client) {
		return new Client(client);
	}
}
