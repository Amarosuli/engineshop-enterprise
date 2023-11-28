/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('x9y4ygknk5gu3uw');

		// remove
		collection.schema.removeField('luufwsif');

		// remove
		collection.schema.removeField('atgzkhgg');

		// remove
		collection.schema.removeField('o4wrzthb');

		// remove
		collection.schema.removeField('e5fmkaij');

		// remove
		collection.schema.removeField('9g0jw7b1');

		// remove
		collection.schema.removeField('1rzvrj3g');

		// remove
		collection.schema.removeField('ywmyyzoh');

		// remove
		collection.schema.removeField('xo1wefgh');

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: '0ypgqtuz',
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
				id: 'f6jxewic',
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
				id: 'hom4k0d1',
				name: 'isPreservable',
				type: 'bool',
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
				id: 'lfjwzxgl',
				name: 'duration',
				type: 'select',
				required: true,
				presentable: false,
				unique: false,
				options: {
					maxSelect: 1,
					values: ['90', '180', '360']
				}
			})
		);

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'ugexdunn',
				name: 'date_performed',
				type: 'date',
				required: true,
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
				id: 'lacy8gnk',
				name: 'tag',
				type: 'file',
				required: false,
				presentable: false,
				unique: false,
				options: {
					maxSelect: 1,
					maxSize: 5242880,
					mimeTypes: ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'image/webp'],
					thumbs: [],
					protected: false
				}
			})
		);

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'fxtihcnb',
				name: 'material',
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
				id: '5vkputdo',
				name: 'history_number',
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
		const collection = dao.findCollectionByNameOrId('x9y4ygknk5gu3uw');

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'luufwsif',
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

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'atgzkhgg',
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
				id: 'o4wrzthb',
				name: 'isPreservable',
				type: 'bool',
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
				id: 'e5fmkaij',
				name: 'duration',
				type: 'select',
				required: true,
				presentable: false,
				unique: false,
				options: {
					maxSelect: 1,
					values: ['90', '180', '360']
				}
			})
		);

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: '9g0jw7b1',
				name: 'date_performed',
				type: 'date',
				required: true,
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
				id: '1rzvrj3g',
				name: 'tag',
				type: 'file',
				required: false,
				presentable: false,
				unique: false,
				options: {
					maxSelect: 1,
					maxSize: 5242880,
					mimeTypes: ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'image/webp'],
					thumbs: [],
					protected: false
				}
			})
		);

		// add
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: 'ywmyyzoh',
				name: 'material',
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
				id: 'xo1wefgh',
				name: 'history_number',
				type: 'json',
				required: false,
				presentable: false,
				unique: false,
				options: {}
			})
		);

		// remove
		collection.schema.removeField('0ypgqtuz');

		// remove
		collection.schema.removeField('f6jxewic');

		// remove
		collection.schema.removeField('hom4k0d1');

		// remove
		collection.schema.removeField('lfjwzxgl');

		// remove
		collection.schema.removeField('ugexdunn');

		// remove
		collection.schema.removeField('lacy8gnk');

		// remove
		collection.schema.removeField('fxtihcnb');

		// remove
		collection.schema.removeField('5vkputdo');

		return dao.saveCollection(collection);
	}
);
