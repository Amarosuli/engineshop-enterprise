/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('hnaj3l1dleqv926');

		collection.options = {
			query: 'SELECT engine_list.id, engine_list.esn\nFROM engine_list\nLEFT JOIN engine_availability on engine_availability.engine_id = engine_list.id\nGROUP BY engine_list.id'
		};

		// remove
		collection.schema.removeField('o7kppnpr');

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'ooibjnvv',
				name: 'esn',
				type: 'text',
				required: true,
				presentable: true,
				unique: false,
				options: {
					min: null,
					max: null,
					pattern: ''
				}
			})
		);

		return dao.saveCollection(collection);
	},
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('hnaj3l1dleqv926');

		collection.options = {
			query: 'SELECT engine_list.id, engine_list.esn\nFROM engine_list'
		};

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'o7kppnpr',
				name: 'esn',
				type: 'text',
				required: true,
				presentable: true,
				unique: false,
				options: {
					min: null,
					max: null,
					pattern: ''
				}
			})
		);

		// remove
		collection.schema.removeField('ooibjnvv');

		return dao.saveCollection(collection);
	}
);
