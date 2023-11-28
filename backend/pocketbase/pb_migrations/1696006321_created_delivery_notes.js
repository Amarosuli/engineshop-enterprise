/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const collection = new Collection({
			id: '18lpdkxoc82oo8w',
			created: '2023-09-29 16:52:01.338Z',
			updated: '2023-09-29 16:52:01.338Z',
			name: 'delivery_notes',
			type: 'base',
			system: false,
			schema: [
				{
					system: false,
					id: 'loohmxnk',
					name: 'number',
					type: 'text',
					required: false,
					presentable: false,
					unique: false,
					options: {
						min: null,
						max: null,
						pattern: ''
					}
				},
				{
					system: false,
					id: 'j4k95liu',
					name: 'shipper_name',
					type: 'text',
					required: false,
					presentable: false,
					unique: false,
					options: {
						min: null,
						max: null,
						pattern: ''
					}
				},
				{
					system: false,
					id: 'kunigncw',
					name: 'shipper_id',
					type: 'text',
					required: false,
					presentable: false,
					unique: false,
					options: {
						min: null,
						max: null,
						pattern: ''
					}
				},
				{
					system: false,
					id: 'a64iemue',
					name: 'shipper_unit',
					type: 'text',
					required: false,
					presentable: false,
					unique: false,
					options: {
						min: null,
						max: null,
						pattern: ''
					}
				},
				{
					system: false,
					id: 'zfxfzk3d',
					name: 'shipper_sign',
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
				},
				{
					system: false,
					id: 'ykop21rz',
					name: 'recipient_name',
					type: 'text',
					required: false,
					presentable: false,
					unique: false,
					options: {
						min: null,
						max: null,
						pattern: ''
					}
				},
				{
					system: false,
					id: 'oodxawnb',
					name: 'recipient_id',
					type: 'text',
					required: false,
					presentable: false,
					unique: false,
					options: {
						min: null,
						max: null,
						pattern: ''
					}
				},
				{
					system: false,
					id: 'am1bduxi',
					name: 'recipient_unit',
					type: 'text',
					required: false,
					presentable: false,
					unique: false,
					options: {
						min: null,
						max: null,
						pattern: ''
					}
				},
				{
					system: false,
					id: 'kthob7xy',
					name: 'recipient_sign',
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
				},
				{
					system: false,
					id: '29oxbq4h',
					name: 'data',
					type: 'json',
					required: false,
					presentable: false,
					unique: false,
					options: {}
				}
			],
			indexes: [],
			listRule: '',
			viewRule: '',
			createRule: '',
			updateRule: '',
			deleteRule: '',
			options: {}
		});

		return Dao(db).saveCollection(collection);
	},
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId('18lpdkxoc82oo8w');

		return dao.deleteCollection(collection);
	}
);
