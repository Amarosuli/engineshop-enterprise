/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('18lpdkxoc82oo8w');

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'ndte2fx8',
				name: 'template_id',
				type: 'relation',
				required: false,
				presentable: false,
				unique: false,
				options: {
					collectionId: 'ls1b0rqbxh95iai',
					cascadeDelete: false,
					minSelect: null,
					maxSelect: 1,
					displayFields: null
				}
			})
		);

		return dao.saveCollection(collection);
	},
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('18lpdkxoc82oo8w');

		// remove
		collection.schema.removeField('ndte2fx8');

		return dao.saveCollection(collection);
	}
);
