/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('hnaj3l1dleqv926');

		collection.options = {
			query:
				'SELECT engine_list.id, engine_list.esn, engine_availability.date_performed, engine_availability.status\nFROM engine_list\nLEFT JOIN engine_availability on engine_availability.engine_id = engine_list.id\nGROUP BY engine_list.id'
		};

		// remove
		collection.schema.removeField('ooibjnvv');

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'jxmcnwfl',
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

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'azcdfvdp',
				name: 'date_performed',
				type: 'date',
				required: false,
				presentable: false,
				unique: false,
				options: {
					min: '',
					max: ''
				}
			})
		);

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'zgbwgsvb',
				name: 'status',
				type: 'select',
				required: false,
				presentable: false,
				unique: false,
				options: {
					maxSelect: 1,
					values: ['INCOMING', 'OUTGOING']
				}
			})
		);

		return dao.saveCollection(collection);
	},
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('hnaj3l1dleqv926');

		collection.options = {
			query: 'SELECT engine_list.id, engine_list.esn\nFROM engine_list\nLEFT JOIN engine_availability on engine_availability.engine_id = engine_list.id\nGROUP BY engine_list.id'
		};

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

		// remove
		collection.schema.removeField('jxmcnwfl');

		// remove
		collection.schema.removeField('azcdfvdp');

		// remove
		collection.schema.removeField('zgbwgsvb');

		return dao.saveCollection(collection);
	}
);
