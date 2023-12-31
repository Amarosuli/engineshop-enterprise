/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('hnaj3l1dleqv926');

		collection.options = {
			query: 'SELECT id, status FROM\n(SELECT id, status, ROW_NUMBER() OVER(PARTITION BY id ORDER BY status DESC)as id FROM engine_availability)\nWHERE id =1 '
		};

		// remove
		collection.schema.removeField('vgzp3vzm');

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'n34f0b5m',
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
				'SELECT id, status FROM\n(SELECT engine_availability.id, engine_availability.status, ROW_NUMBER() OVER(PARTITION BY id ORDER BY engine_availability.status DESC)as id FROM engine_availability)\nWHERE id =1 '
		};

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'vgzp3vzm',
				name: 'status',
				type: 'json',
				required: false,
				presentable: false,
				unique: false,
				options: {}
			})
		);

		// remove
		collection.schema.removeField('n34f0b5m');

		return dao.saveCollection(collection);
	}
);
