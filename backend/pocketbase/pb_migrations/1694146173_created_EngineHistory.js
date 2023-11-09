/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "hnaj3l1dleqv926",
    "created": "2023-09-08 04:09:33.049Z",
    "updated": "2023-09-08 04:09:33.049Z",
    "name": "EngineHistory",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "o7kppnpr",
        "name": "esn",
        "type": "text",
        "required": true,
        "presentable": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT engine_list.id, engine_list.esn\nFROM engine_list"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("hnaj3l1dleqv926");

  return dao.deleteCollection(collection);
})
