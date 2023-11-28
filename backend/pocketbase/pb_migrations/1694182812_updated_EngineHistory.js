/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('hnaj3l1dleqv926');

		collection.options = {
			query:
				'WITH EH AS (\nSELECT engine_availability.engine_id, engine_availability.status, (ROW_NUMBER() OVER(partition BY engine_availability.engine_id ORDER BY engine_availability.created DESC)) AS HistoryNumber, (ROW_NUMBER() OVER()) AS id FROM engine_availability )\nSELECT EH.engine_id, EH.status, (ROW_NUMBER() OVER()) AS id FROM EH WHERE HistoryNumber=1'
		};

		// remove
		collection.schema.removeField('dgylxaax');

		// remove
		collection.schema.removeField('rv6to7gx');

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

		return dao.saveCollection(collection);
	},
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('hnaj3l1dleqv926');

		collection.options = {
			query:
				'WITH EH AS (\nSELECT engine_availability.engine_id, engine_availability.status, (ROW_NUMBER() OVER(partition by engine_availability.engine_id order by engine_availability.created DESC)) as HN, (ROW_NUMBER() OVER()) as id FROM engine_availability )\nSELECT EH.engine_id, EH.status, (ROW_NUMBER() OVER()) as id FROM EH WHERE HN=1'
		};

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'dgylxaax',
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
				id: 'rv6to7gx',
				name: 'status',
				type: 'json',
				required: false,
				presentable: false,
				unique: false,
				options: {}
			})
		);

		// remove
		collection.schema.removeField('cn69qcxn');

		// remove
		collection.schema.removeField('r8in1rxb');

		return dao.saveCollection(collection);
	}
);
