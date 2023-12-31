/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('hnaj3l1dleqv926');

		collection.options = {
			query:
				'SELECT engine_availability.engine_id, engine_availability.status, (ROW_NUMBER() OVER(partition by engine_availability.status order by engine_availability.engine_id DESC)) as rn, (ROW_NUMBER() OVER()) as id FROM engine_availability'
		};

		// remove
		collection.schema.removeField('yofofwjr');

		// remove
		collection.schema.removeField('qojel1gf');

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'pynurps3',
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
				id: '6w4q1gof',
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
				id: 'flsemwa2',
				name: 'rn',
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
			query: 'SELECT engine_availability.engine_id, engine_availability.status, (ROW_NUMBER() OVER()) as id FROM engine_availability'
		};

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

		// remove
		collection.schema.removeField('pynurps3');

		// remove
		collection.schema.removeField('6w4q1gof');

		// remove
		collection.schema.removeField('flsemwa2');

		return dao.saveCollection(collection);
	}
);
