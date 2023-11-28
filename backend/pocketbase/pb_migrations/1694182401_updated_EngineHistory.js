/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('hnaj3l1dleqv926');

		collection.options = {
			query:
				'SELECT engine_id, status, (ROW_NUMBER() OVER(partition by HN order by HN)) as id FROM (\nSELECT engine_availability.engine_id, engine_availability.status, (ROW_NUMBER() OVER(partition by engine_availability.engine_id order by engine_availability.created ASC)) as HN, (ROW_NUMBER() OVER()) as id FROM engine_availability\n  )\nWHERE HN=1'
		};

		// remove
		collection.schema.removeField('kocoutc5');

		// remove
		collection.schema.removeField('mev1cbaz');

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: '9bh6qndo',
				name: 'engine_id',
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
				id: 'ztpkypzu',
				name: 'status',
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
				'SELECT engine_id, status, (ROW_NUMBER() OVER()) as id FROM (\nSELECT engine_availability.engine_id, engine_availability.status, (ROW_NUMBER() OVER(partition by engine_availability.engine_id order by engine_availability.created ASC)) as HN, (ROW_NUMBER() OVER()) as id FROM engine_availability\n  )\nWHERE HN=1'
		};

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'kocoutc5',
				name: 'engine_id',
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
				id: 'mev1cbaz',
				name: 'status',
				type: 'json',
				required: false,
				presentable: false,
				unique: false,
				options: {}
			})
		);

		// remove
		collection.schema.removeField('9bh6qndo');

		// remove
		collection.schema.removeField('ztpkypzu');

		return dao.saveCollection(collection);
	}
);
