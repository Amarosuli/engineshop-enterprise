/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('ie3ktv82n440swq');

		// remove
		collection.schema.removeField('qbeb6zvn');

		// remove
		collection.schema.removeField('7r8yuymd');

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'k2nsr0yu',
				name: 'status',
				type: 'select',
				required: false,
				presentable: false,
				unique: false,
				options: {
					maxSelect: 1,
					values: ['incoming', 'outgoing']
				}
			})
		);

		// update
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'eyealvhz',
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

		return dao.saveCollection(collection);
	},
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('ie3ktv82n440swq');

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'qbeb6zvn',
				name: 'date_out',
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
				id: '7r8yuymd',
				name: 'isInShop',
				type: 'bool',
				required: false,
				presentable: false,
				unique: false,
				options: {}
			})
		);

		// remove
		collection.schema.removeField('k2nsr0yu');

		// update
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'eyealvhz',
				name: 'date_in',
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

		return dao.saveCollection(collection);
	}
);
