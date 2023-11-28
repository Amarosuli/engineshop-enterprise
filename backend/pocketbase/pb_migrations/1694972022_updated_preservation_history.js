/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('x9y4ygknk5gu3uw');

		collection.options = {
			query:
				'SELECT preservation_list.id, preservation_list.engine_id, preservation_list.duration, preservation_list.date_performed, preservation_list.tag, preservation_list.material, (ROW_NUMBER() OVER(partition BY preservation_list.engine_id ORDER BY preservation_list.date_performed DESC )) AS history_number FROM preservation_list'
		};

		// remove
		collection.schema.removeField('upisnfc2');

		// remove
		collection.schema.removeField('juqiubyu');

		// remove
		collection.schema.removeField('symipfc2');

		// remove
		collection.schema.removeField('3ukg18od');

		// remove
		collection.schema.removeField('q7byuvc6');

		// remove
		collection.schema.removeField('wontrhbi');

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: '04pnnwh2',
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
				id: 'o7shwppk',
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
				id: 'hjw2e0es',
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
				id: '1j84kzrd',
				name: 'tag',
				type: 'file',
				required: false,
				presentable: false,
				unique: false,
				options: {
					maxSelect: 1,
					maxSize: 5242880,
					mimeTypes: ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'image/webp'],
					thumbs: [],
					protected: false
				}
			})
		);

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: '5919kzwj',
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
				id: 'ackbscav',
				name: 'history_number',
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
				'SELECT preservation_list.id, preservation_list.engine_id, preservation_list.duration, preservation_list.date_performed, preservation_list.tag, preservation_list.material, (ROW_NUMBER() OVER(partition BY preservation_list.engine_id ORDER BY preservation_list.date_performed )) AS history_number FROM preservation_list'
		};

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'upisnfc2',
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
				id: 'juqiubyu',
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
				id: 'symipfc2',
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
				id: '3ukg18od',
				name: 'tag',
				type: 'file',
				required: false,
				presentable: false,
				unique: false,
				options: {
					maxSelect: 1,
					maxSize: 5242880,
					mimeTypes: ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'image/webp'],
					thumbs: [],
					protected: false
				}
			})
		);

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'q7byuvc6',
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
				id: 'wontrhbi',
				name: 'history_number',
				type: 'json',
				required: false,
				presentable: false,
				unique: false,
				options: {}
			})
		);

		// remove
		collection.schema.removeField('04pnnwh2');

		// remove
		collection.schema.removeField('o7shwppk');

		// remove
		collection.schema.removeField('hjw2e0es');

		// remove
		collection.schema.removeField('1j84kzrd');

		// remove
		collection.schema.removeField('5919kzwj');

		// remove
		collection.schema.removeField('ackbscav');

		return dao.saveCollection(collection);
	}
);
