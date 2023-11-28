/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('hnaj3l1dleqv926');

		collection.listRule = '';
		collection.viewRule = '';

		// remove
		collection.schema.removeField('y6syjmtm');

		// remove
		collection.schema.removeField('l5r8bhr8');

		// remove
		collection.schema.removeField('kxhwq8us');

		// remove
		collection.schema.removeField('omuogzs8');

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'ny8ao3jr',
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
				id: 'nabicm8q',
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
				id: '6zozgkxy',
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
				id: 'ez6cyqqj',
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

		collection.listRule = null;
		collection.viewRule = null;

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'y6syjmtm',
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
				id: 'l5r8bhr8',
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
				id: 'kxhwq8us',
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
				id: 'omuogzs8',
				name: 'HistoryNumber',
				type: 'json',
				required: false,
				presentable: false,
				unique: false,
				options: {}
			})
		);

		// remove
		collection.schema.removeField('ny8ao3jr');

		// remove
		collection.schema.removeField('nabicm8q');

		// remove
		collection.schema.removeField('6zozgkxy');

		// remove
		collection.schema.removeField('ez6cyqqj');

		return dao.saveCollection(collection);
	}
);
