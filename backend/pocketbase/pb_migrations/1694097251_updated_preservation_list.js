/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('nbze5ep2ppbp4pa');

		// update
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'qc2rzosj',
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

		return dao.saveCollection(collection);
	},
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('nbze5ep2ppbp4pa');

		// update
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'qc2rzosj',
				name: 'engine_id',
				type: 'relation',
				required: true,
				presentable: true,
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

		return dao.saveCollection(collection);
	}
);
