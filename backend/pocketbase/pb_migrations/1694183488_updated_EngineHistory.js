/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('hnaj3l1dleqv926');

		collection.options = {
			query:
				'SELECT engine_availability.engine_id, engine_availability.status, engine_availability.date_performed, engine_list.esn, (ROW_NUMBER() OVER(partition BY engine_availability.engine_id ORDER BY engine_availability.created DESC)) AS HistoryNumber, (ROW_NUMBER() OVER()) AS id FROM engine_availability LEFT JOIN engine_list ON engine_list.id = engine_availability.engine_id'
		};

		// remove
		collection.schema.removeField('w8mqrpg9');

		// remove
		collection.schema.removeField('jxk6wjca');

		// remove
		collection.schema.removeField('xf5ohk8m');

		// remove
		collection.schema.removeField('oxi4mdhy');

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'ldzzkvj1',
				name: 'engine_id',
				type: 'relation',
				required: true,
				presentable: false,
				unique: false,
				options: {
					collectionId: 'bujuly5k065pzkr',
					cascadeDelete: true,
					minSelect: null,
					maxSelect: 1,
					displayFields: ['esn']
				}
			})
		);

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'c7ereo5m',
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

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'ae0gvsm2',
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
				id: 'mc18slzk',
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
				id: 'xn3nfdxf',
				name: 'HistoryNumber',
				type: 'json',
				required: false,
				presentable: false,
				unique: false,
				options: {}
			})
		);

		return dao.saveCollection(collection);
	},
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('hnaj3l1dleqv926');

		collection.options = {
			query:
				'SELECT engine_availability.engine_id, engine_availability.status, engine_list.esn, (ROW_NUMBER() OVER(partition BY engine_availability.engine_id ORDER BY engine_availability.created DESC)) AS HistoryNumber, (ROW_NUMBER() OVER()) AS id FROM engine_availability LEFT JOIN engine_list ON engine_list.id = engine_availability.engine_id'
		};

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'w8mqrpg9',
				name: 'engine_id',
				type: 'relation',
				required: true,
				presentable: false,
				unique: false,
				options: {
					collectionId: 'bujuly5k065pzkr',
					cascadeDelete: true,
					minSelect: null,
					maxSelect: 1,
					displayFields: ['esn']
				}
			})
		);

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'jxk6wjca',
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

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'xf5ohk8m',
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
				id: 'oxi4mdhy',
				name: 'HistoryNumber',
				type: 'json',
				required: false,
				presentable: false,
				unique: false,
				options: {}
			})
		);

		// remove
		collection.schema.removeField('ldzzkvj1');

		// remove
		collection.schema.removeField('c7ereo5m');

		// remove
		collection.schema.removeField('ae0gvsm2');

		// remove
		collection.schema.removeField('mc18slzk');

		// remove
		collection.schema.removeField('xn3nfdxf');

		return dao.saveCollection(collection);
	}
);
