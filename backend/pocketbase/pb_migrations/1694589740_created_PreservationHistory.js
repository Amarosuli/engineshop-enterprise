/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const collection = new Collection({
			id: 'x9y4ygknk5gu3uw',
			created: '2023-09-13 07:22:20.915Z',
			updated: '2023-09-13 07:22:20.915Z',
			name: 'PreservationHistory',
			type: 'view',
			system: false,
			schema: [
				{
					system: false,
					id: 'arl9mkjc',
					name: 'duration',
					type: 'select',
					required: true,
					presentable: false,
					unique: false,
					options: {
						maxSelect: 1,
						values: ['90', '180', '360']
					}
				},
				{
					system: false,
					id: 'bgh4bidk',
					name: 'date_performed',
					type: 'date',
					required: true,
					presentable: false,
					unique: false,
					options: {
						min: '',
						max: ''
					}
				},
				{
					system: false,
					id: 'wycgydnw',
					name: 'material',
					type: 'json',
					required: false,
					presentable: false,
					unique: false,
					options: {}
				},
				{
					system: false,
					id: 'e3w0axn1',
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
				}
			],
			indexes: [],
			listRule: null,
			viewRule: null,
			createRule: null,
			updateRule: null,
			deleteRule: null,
			options: {
				query:
					'SELECT preservation_list.id, preservation_list.duration, preservation_list.date_performed, preservation_list.material, engine_list.esn FROM preservation_list\nJOIN engine_list ON engine_list.id = preservation_list.id'
			}
		});

		return Dao(db).saveCollection(collection);
	},
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('x9y4ygknk5gu3uw');

		return dao.deleteCollection(collection);
	}
);
