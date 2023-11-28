/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('x9y4ygknk5gu3uw');

		collection.listRule = '';
		collection.viewRule = '';

		// remove
		collection.schema.removeField('xswnpptv');

		// remove
		collection.schema.removeField('onouslyk');

		// remove
		collection.schema.removeField('yr1g50va');

		// remove
		collection.schema.removeField('tk6gys9e');

		// remove
		collection.schema.removeField('ovhavv5w');

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'tbnyajv8',
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
				id: 'omf5i9xg',
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
				id: 'zltfbxjl',
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
				id: 'ubgeedzz',
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
				id: 'jb4kbc1b',
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

		collection.listRule = null;
		collection.viewRule = null;

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'xswnpptv',
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
				id: 'onouslyk',
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
				id: 'yr1g50va',
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
				id: 'tk6gys9e',
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
				id: 'ovhavv5w',
				name: 'history_number',
				type: 'json',
				required: false,
				presentable: false,
				unique: false,
				options: {}
			})
		);

		// remove
		collection.schema.removeField('tbnyajv8');

		// remove
		collection.schema.removeField('omf5i9xg');

		// remove
		collection.schema.removeField('zltfbxjl');

		// remove
		collection.schema.removeField('ubgeedzz');

		// remove
		collection.schema.removeField('jb4kbc1b');

		return dao.saveCollection(collection);
	}
);
