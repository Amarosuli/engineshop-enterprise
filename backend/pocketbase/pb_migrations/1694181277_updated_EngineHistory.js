/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('hnaj3l1dleqv926');

		collection.options = {
			query: 'SELECT id, status FROM\n(SELECT id, status, (ROW_NUMBER() OVER(PARTITION BY id ORDER BY status DESC)) as id FROM engine_availability)\nWHERE id=1 '
		};

		// remove
		collection.schema.removeField('mrngmt8p');

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'bdeqdn0a',
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
			query: 'SELECT id, status FROM\n(SELECT id, status, ROW_NUMBER() OVER(PARTITION BY id ORDER BY status DESC)as id FROM engine_availability)\nWHERE id=1 '
		};

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'mrngmt8p',
				name: 'status',
				type: 'json',
				required: false,
				presentable: false,
				unique: false,
				options: {}
			})
		);

		// remove
		collection.schema.removeField('bdeqdn0a');

		return dao.saveCollection(collection);
	}
);
