/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('x9y4ygknk5gu3uw');

		collection.options = {
			query:
				'SELECT preservation_list.id, preservation_list.engine_id, preservation_list.duration, preservation_list.date_performed, preservation_list.tag, preservation_list.material, (ROW_NUMBER() OVER(partition BY preservation_list.engine_id ORDER BY preservation_list.date_performed )) AS history_number FROM preservation_list'
		};

		// remove
		collection.schema.removeField('jc9vvkvl');

		// remove
		collection.schema.removeField('kju4wpjw');

		// remove
		collection.schema.removeField('xr1mx8gp');

		// remove
		collection.schema.removeField('jmw7dmrs');

		// remove
		collection.schema.removeField('qdwzvbgb');

		// remove
		collection.schema.removeField('78tokbol');

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

		return dao.saveCollection(collection);
	},
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('x9y4ygknk5gu3uw');

		collection.options = {
			query:
				'SELECT preservation_list.id, preservation_list.engine_id, preservation_list.duration, preservation_list.date_performed, preservation_list.tag, preservation_list.material, (ROW_NUMBER() OVER(partition BY preservation_list.engine_id ORDER BY preservation_list.date_performed DESC )) AS history_number FROM preservation_list'
		};

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'jc9vvkvl',
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
				id: 'kju4wpjw',
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
				id: 'xr1mx8gp',
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
				id: 'jmw7dmrs',
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
				id: 'qdwzvbgb',
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
				id: '78tokbol',
				name: 'history_number',
				type: 'json',
				required: false,
				presentable: false,
				unique: false,
				options: {}
			})
		);

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

		return dao.saveCollection(collection);
	}
);
