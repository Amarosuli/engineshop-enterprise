/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('hnaj3l1dleqv926');

		collection.options = {
			query:
				'SELECT engine_availability.engine_id, engine_availability.status, (ROW_NUMBER() OVER(partition BY engine_availability.engine_id ORDER BY engine_availability.created DESC)) AS HistoryNumber, (ROW_NUMBER() OVER()) AS id FROM engine_availability'
		};

		// remove
		collection.schema.removeField('cn69qcxn');

		// remove
		collection.schema.removeField('r8in1rxb');

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'd0w7poh9',
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
				id: 'nxfy6hk4',
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
				id: 'sgcrakea',
				name: 'HistoryNumber',
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
				'WITH EH AS (\nSELECT engine_availability.engine_id, engine_availability.status, (ROW_NUMBER() OVER(partition BY engine_availability.engine_id ORDER BY engine_availability.created DESC)) AS HistoryNumber, (ROW_NUMBER() OVER()) AS id FROM engine_availability )\nSELECT EH.engine_id, EH.status, (ROW_NUMBER() OVER()) AS id FROM EH WHERE HistoryNumber=1'
		};

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'cn69qcxn',
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
				id: 'r8in1rxb',
				name: 'status',
				type: 'json',
				required: false,
				presentable: false,
				unique: false,
				options: {}
			})
		);

		// remove
		collection.schema.removeField('d0w7poh9');

		// remove
		collection.schema.removeField('nxfy6hk4');

		// remove
		collection.schema.removeField('sgcrakea');

		return dao.saveCollection(collection);
	}
);
