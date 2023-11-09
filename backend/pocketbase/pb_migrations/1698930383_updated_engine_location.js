/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v02tn36kvg3k0of")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "f3raykdr",
    "name": "isBeingUsed",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v02tn36kvg3k0of")

  // remove
  collection.schema.removeField("f3raykdr")

  return dao.saveCollection(collection)
})
