/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('hnaj3l1dleqv926');

		collection.options = {
			query:
				'SELECT engine_availability.engine_id, engine_availability.status, (ROW_NUMBER() OVER(partition by engine_availability.engine_id order by engine_availability.created ASC)) as HN, (ROW_NUMBER() OVER()) as id FROM engine_availability'
		};

		// remove
		collection.schema.removeField('affrg9ko');

		// remove
		collection.schema.removeField('x8edqxyg');

		// remove
		collection.schema.removeField('5ccdqm9n');

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'hga83z1f',
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
				id: 'snlqinfu',
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
				id: 'as1jmgie',
				name: 'HN',
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
				'SELECT engine_availability.engine_id, engine_availability.status, (ROW_NUMBER() OVER(partition by engine_availability.engine_id order by engine_availability.status ASC)) as HN, (ROW_NUMBER() OVER()) as id FROM engine_availability'
		};

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'affrg9ko',
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
				id: 'x8edqxyg',
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
				id: '5ccdqm9n',
				name: 'HN',
				type: 'json',
				required: false,
				presentable: false,
				unique: false,
				options: {}
			})
		);

		// remove
		collection.schema.removeField('hga83z1f');

		// remove
		collection.schema.removeField('snlqinfu');

		// remove
		collection.schema.removeField('as1jmgie');

		return dao.saveCollection(collection);
	}
);
