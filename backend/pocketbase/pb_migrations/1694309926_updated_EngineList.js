/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("07lq74hd0ee1ex4")

  collection.options = {
    "query": "SELECT engine_list.id, engine_list.esn, engine_location.location FROM engine_list\nINNER JOIN engine_location ON engine_location.engine_id=engine_list.id"
  }

  // remove
  collection.schema.removeField("vtvowxa5")

  // remove
  collection.schema.removeField("rs6n8hmy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fzdjxnx4",
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
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rkiljoeu",
    "name": "location",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("07lq74hd0ee1ex4")

  collection.options = {
    "query": "SELECT engine_list.id, engine_list.esn, engine_location.location FROM engine_list\nLEFT JOIN engine_location ON engine_location.engine_id=engine_list.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vtvowxa5",
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
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rs6n8hmy",
    "name": "location",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("fzdjxnx4")

  // remove
  collection.schema.removeField("rkiljoeu")

  return dao.saveCollection(collection)
})
