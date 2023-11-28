/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('x9y4ygknk5gu3uw');

		collection.options = {
			query:
				'SELECT preservation_list.id, preservation_list.engine_id, preservation_list.duration, preservation_list.date_performed, preservation_list.material, (ROW_NUMBER() OVER(partition BY preservation_list.id ORDER BY preservation_list.date_performed DESC )) AS HistoryNumber FROM preservation_list'
		};

		// remove
		collection.schema.removeField('toqacnmy');

		// remove
		collection.schema.removeField('rdsrssmo');

		// remove
		collection.schema.removeField('dsqsmds8');

		// remove
		collection.schema.removeField('8erfhy6d');

		// remove
		collection.schema.removeField('0isfbcc1');

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'exlw0f6a',
				name: 'engine_id',
				type: 'relation',
				required: true,
				presentable: false,
				unique: false,
				options: {
					collectionId: 'bujuly5k065pzkr',
					cascadeDelete: false,
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
				id: '3vicugny',
				name: 'duration',
				type: 'select',
				required: true,
				presentable: false,
				unique: false,
				options: {
					maxSelect: 1,
					values: ['90', '180', '360']
				}
			})
		);

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: '68babxz9',
				name: 'date_performed',
				type: 'date',
				required: true,
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
				id: 'lid5n8by',
				name: 'material',
				type: 'json',
				required: false,
				presentable: false,
				unique: false,
				options: {}
			})
		);

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'jqzxedrm',
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
		const collection = dao.findCollectionByNameOrId('x9y4ygknk5gu3uw');

		collection.options = {
			query:
				'SELECT preservation_list.id, preservation_list.engine_id, engine_list.esn, preservation_list.duration, preservation_list.date_performed, preservation_list.material  FROM preservation_list\nJOIN engine_list ON engine_list.id = preservation_list.engine_id'
		};

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'toqacnmy',
				name: 'engine_id',
				type: 'relation',
				required: true,
				presentable: false,
				unique: false,
				options: {
					collectionId: 'bujuly5k065pzkr',
					cascadeDelete: false,
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
				id: 'rdsrssmo',
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
				id: 'dsqsmds8',
				name: 'duration',
				type: 'select',
				required: true,
				presentable: false,
				unique: false,
				options: {
					maxSelect: 1,
					values: ['90', '180', '360']
				}
			})
		);

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: '8erfhy6d',
				name: 'date_performed',
				type: 'date',
				required: true,
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
				id: '0isfbcc1',
				name: 'material',
				type: 'json',
				required: false,
				presentable: false,
				unique: false,
				options: {}
			})
		);

		// remove
		collection.schema.removeField('exlw0f6a');

		// remove
		collection.schema.removeField('3vicugny');

		// remove
		collection.schema.removeField('68babxz9');

		// remove
		collection.schema.removeField('lid5n8by');

		// remove
		collection.schema.removeField('jqzxedrm');

		return dao.saveCollection(collection);
	}
);
