/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('hnaj3l1dleqv926');

		collection.options = {
			query:
				'SELECT id, status FROM\n(SELECT engine_availability.id, engine_availability.status, ROW_NUMBER() OVER(PARTITION BY id ORDER BY engine_availability.status DESC)as id FROM engine_availability)\nWHERE id =1 '
		};

		// remove
		collection.schema.removeField('nkrpwy06');

		// remove
		collection.schema.removeField('ayd9kaor');

		// remove
		collection.schema.removeField('rds9of2l');

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

		return dao.saveCollection(collection);
	},
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('hnaj3l1dleqv926');

		collection.options = {
			query:
				'SELECT engine_list.id, engine_list.esn, engine_availability.date_performed, engine_availability.status\nFROM engine_list\nLEFT JOIN engine_availability on engine_availability.engine_id = engine_list.id\nGROUP BY engine_list.id'
		};

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'nkrpwy06',
				name: 'esn',
				type: 'text',
				required: true,
				presentable: true,
				unique: false,
				options: {
					min: null,
					max: null,
					pattern: ''
				}
			})
		);

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'ayd9kaor',
				name: 'date_performed',
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
				id: 'rds9of2l',
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
		collection.schema.removeField('vgzp3vzm');

		return dao.saveCollection(collection);
	}
);
