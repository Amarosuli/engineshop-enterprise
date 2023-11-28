/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('npzw759mv93hiu9');

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'atl4vha5',
				name: 'started_at',
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
				id: 'bycqyvnd',
				name: 'finished_at',
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
		const collection = dao.findCollectionByNameOrId('npzw759mv93hiu9');

		// remove
		collection.schema.removeField('atl4vha5');

		// remove
		collection.schema.removeField('bycqyvnd');

		return dao.saveCollection(collection);
	}
);
