/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnaj3l1dleqv926")

  collection.name = "engine_history"
  collection.options = {
    "query": "SELECT engine_availability.id, engine_availability.engine_id, engine_availability.status, engine_availability.date_performed, (ROW_NUMBER() OVER(partition BY engine_availability.engine_id ORDER BY engine_availability.created DESC)) AS history_number FROM engine_availability"
  }

  // remove
  collection.schema.removeField("ghdngqm8")

  // remove
  collection.schema.removeField("huynpwae")

  // remove
  collection.schema.removeField("euhrw8nq")

  // remove
  collection.schema.removeField("s4lztsg9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wuunw88p",
    "name": "engine_id",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "bujuly5k065pzkr",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "esn"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mo7o0jmk",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vcgqksct",
    "name": "date_performed",
    "type": "date",
    "required": false,
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
    "id": "jpbncxxd",
    "name": "history_number",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnaj3l1dleqv926")

  collection.name = "EngineHistory"
  collection.options = {
    "query": "SELECT engine_availability.id, engine_availability.engine_id, engine_availability.status, engine_availability.date_performed, (ROW_NUMBER() OVER(partition BY engine_availability.engine_id ORDER BY engine_availability.created DESC)) AS HistoryNumber FROM engine_availability"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ghdngqm8",
    "name": "engine_id",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "bujuly5k065pzkr",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "esn"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "huynpwae",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "euhrw8nq",
    "name": "date_performed",
    "type": "date",
    "required": false,
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
    "id": "s4lztsg9",
    "name": "HistoryNumber",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("wuunw88p")

  // remove
  collection.schema.removeField("mo7o0jmk")

  // remove
  collection.schema.removeField("vcgqksct")

  // remove
  collection.schema.removeField("jpbncxxd")

  return dao.saveCollection(collection)
})
