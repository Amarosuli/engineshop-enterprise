/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('07lq74hd0ee1ex4');

		return dao.deleteCollection(collection);
	},
	(db) => {
		const collection = new Collection({
			id: '07lq74hd0ee1ex4',
			created: '2023-09-09 23:25:16.390Z',
			updated: '2023-09-10 01:38:46.320Z',
			name: 'EngineList',
			type: 'view',
			system: false,
			schema: [
				{
					system: false,
					id: 'fzdjxnx4',
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
				},
				{
					system: false,
					id: 'rkiljoeu',
					name: 'location',
					type: 'text',
					required: false,
					presentable: false,
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
				query: 'SELECT engine_list.id, engine_list.esn, engine_location.location FROM engine_list\nINNER JOIN engine_location ON engine_location.engine_id=engine_list.id'
			}
		});

		return Dao(db).saveCollection(collection);
	}
);
