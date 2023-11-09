/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ie3ktv82n440swq")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "k2nsr0yu",
    "name": "status",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "INCOMING",
        "OUTGOING"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ie3ktv82n440swq")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "k2nsr0yu",
    "name": "status",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "incoming",
        "outgoing"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
