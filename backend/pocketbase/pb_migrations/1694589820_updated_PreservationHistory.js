/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x9y4ygknk5gu3uw")

  collection.options = {
    "query": "SELECT preservation_list.id, preservation_list.engine_id, preservation_list.duration, preservation_list.date_performed, preservation_list.material, engine_list.esn FROM preservation_list\nLEFT \n  JOIN engine_list ON engine_list.id = preservation_list.engine_id"
  }

  // remove
  collection.schema.removeField("ktgvq2oz")

  // remove
  collection.schema.removeField("yit2vear")

  // remove
  collection.schema.removeField("xclzuxcu")

  // remove
  collection.schema.removeField("zc6z0nsi")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ubbfatpu",
    "name": "engine_id",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yq9bntmm",
    "name": "duration",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "acm8estz",
    "name": "date_performed",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "n64plk1g",
    "name": "material",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bq6208cw",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x9y4ygknk5gu3uw")

  collection.options = {
    "query": "SELECT preservation_list.id, preservation_list.duration, preservation_list.date_performed, preservation_list.material, engine_list.esn FROM preservation_list\nLEFT \n  JOIN engine_list ON engine_list.id = preservation_list.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ktgvq2oz",
    "name": "duration",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yit2vear",
    "name": "date_performed",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xclzuxcu",
    "name": "material",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zc6z0nsi",
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

  // remove
  collection.schema.removeField("ubbfatpu")

  // remove
  collection.schema.removeField("yq9bntmm")

  // remove
  collection.schema.removeField("acm8estz")

  // remove
  collection.schema.removeField("n64plk1g")

  // remove
  collection.schema.removeField("bq6208cw")

  return dao.saveCollection(collection)
})
