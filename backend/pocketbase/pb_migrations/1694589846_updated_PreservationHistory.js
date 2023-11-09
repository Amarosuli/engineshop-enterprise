/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x9y4ygknk5gu3uw")

  collection.options = {
    "query": "SELECT preservation_list.id, preservation_list.duration, preservation_list.date_performed, preservation_list.material, engine_list.esn FROM preservation_list\nJOIN engine_list ON engine_list.id = preservation_list.engine_id"
  }

  // remove
  collection.schema.removeField("ar7a5fac")

  // remove
  collection.schema.removeField("ewlsokpk")

  // remove
  collection.schema.removeField("a4lm8y6z")

  // remove
  collection.schema.removeField("ekeg07tg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "l6iy82jo",
    "name": "duration",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "90",
        "180",
        "360"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "k6ocgmwh",
    "name": "date_performed",
    "type": "date",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9iwmyguh",
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
    "id": "t3dycx8s",
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
    "query": "SELECT preservation_list.id, preservation_list.duration, preservation_list.date_performed, preservation_list.material, engine_list.esn FROM preservation_list\nLEFT \n  JOIN engine_list ON engine_list.id = preservation_list.engine_id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ar7a5fac",
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
    "id": "ewlsokpk",
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
    "id": "a4lm8y6z",
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
    "id": "ekeg07tg",
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
  collection.schema.removeField("l6iy82jo")

  // remove
  collection.schema.removeField("k6ocgmwh")

  // remove
  collection.schema.removeField("9iwmyguh")

  // remove
  collection.schema.removeField("t3dycx8s")

  return dao.saveCollection(collection)
})
