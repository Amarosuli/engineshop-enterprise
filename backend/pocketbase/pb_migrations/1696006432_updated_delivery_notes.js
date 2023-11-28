/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('18lpdkxoc82oo8w');

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: '5aizoenw',
				name: 'shipment_date',
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
		const collection = dao.findCollectionByNameOrId('18lpdkxoc82oo8w');

		// remove
		collection.schema.removeField('5aizoenw');

		return dao.saveCollection(collection);
	}
);
