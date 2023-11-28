/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('bujuly5k065pzkr');

		// remove
		collection.schema.removeField('zq7qvdcl');

		return dao.saveCollection(collection);
	},
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('bujuly5k065pzkr');

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'zq7qvdcl',
				name: 'isAvailable',
				type: 'bool',
				required: false,
				presentable: false,
				unique: false,
				options: {}
			})
		);

		return dao.saveCollection(collection);
	}
);
