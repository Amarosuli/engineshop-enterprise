/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x9y4ygknk5gu3uw")

  collection.options = {
    "query": "SELECT preservation_list.id, preservation_list.duration, preservation_list.date_performed, preservation_list.material, engine_list.esn FROM preservation_list\nLEFT \n  JOIN engine_list ON engine_list.id = preservation_list.id"
  }

  // remove
  collection.schema.removeField("arl9mkjc")

  // remove
  collection.schema.removeField("bgh4bidk")

  // remove
  collection.schema.removeField("wycgydnw")

  // remove
  collection.schema.removeField("e3w0axn1")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x9y4ygknk5gu3uw")

  collection.options = {
    "query": "SELECT preservation_list.id, preservation_list.duration, preservation_list.date_performed, preservation_list.material, engine_list.esn FROM preservation_list\nJOIN engine_list ON engine_list.id = preservation_list.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "arl9mkjc",
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
    "id": "bgh4bidk",
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
    "id": "wycgydnw",
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
    "id": "e3w0axn1",
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
  collection.schema.removeField("ktgvq2oz")

  // remove
  collection.schema.removeField("yit2vear")

  // remove
  collection.schema.removeField("xclzuxcu")

  // remove
  collection.schema.removeField("zc6z0nsi")

  return dao.saveCollection(collection)
})
