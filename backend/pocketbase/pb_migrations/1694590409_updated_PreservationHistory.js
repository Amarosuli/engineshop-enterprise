/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('x9y4ygknk5gu3uw');

		collection.options = {
			query:
				'SELECT preservation_list.id, preservation_list.engine_id, preservation_list.duration, preservation_list.date_performed, preservation_list.material, (ROW_NUMBER() OVER(partition BY preservation_list.engine_id ORDER BY preservation_list.date_performed DESC )) AS HistoryNumber FROM preservation_list'
		};

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

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: '66dtbq0g',
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
				id: 'nmmi9snl',
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
				id: '3xw5xcv6',
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
				id: 'fvu2a6uc',
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
				id: '57bznl1e',
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
				'SELECT preservation_list.id, preservation_list.engine_id, preservation_list.duration, preservation_list.date_performed, preservation_list.material, (ROW_NUMBER() OVER(partition BY preservation_list.id ORDER BY preservation_list.date_performed DESC )) AS HistoryNumber FROM preservation_list'
		};

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

		// remove
		collection.schema.removeField('66dtbq0g');

		// remove
		collection.schema.removeField('nmmi9snl');

		// remove
		collection.schema.removeField('3xw5xcv6');

		// remove
		collection.schema.removeField('fvu2a6uc');

		// remove
		collection.schema.removeField('57bznl1e');

		return dao.saveCollection(collection);
	}
);
