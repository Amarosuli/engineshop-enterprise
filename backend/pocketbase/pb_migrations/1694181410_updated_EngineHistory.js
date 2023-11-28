/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('hnaj3l1dleqv926');

		collection.options = {
			query: 'SELECT engine_availability.engine_id, engine_availability.status, (ROW_NUMBER() OVER()) as id FROM engine_availability'
		};

		// remove
		collection.schema.removeField('bto6s6gc');

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'yofofwjr',
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
				id: 'qojel1gf',
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
			query: 'SELECT id, engine_id FROM\n(SELECT id, engine_id, (ROW_NUMBER() OVER(PARTITION BY id ORDER BY engine_id DESC)) as id FROM engine_availability)\nWHERE id=1 '
		};

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'bto6s6gc',
				name: 'engine_id',
				type: 'json',
				required: false,
				presentable: false,
				unique: false,
				options: {}
			})
		);

		// remove
		collection.schema.removeField('yofofwjr');

		// remove
		collection.schema.removeField('qojel1gf');

		return dao.saveCollection(collection);
	}
);
