/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnaj3l1dleqv926")

  collection.options = {
    "query": "SELECT engine_availability.id, engine_availability.engine_id, engine_availability.status, engine_availability.date_performed, (ROW_NUMBER() OVER(partition BY engine_availability.engine_id ORDER BY engine_availability.created DESC)) AS HistoryNumber FROM engine_availability"
  }

  // remove
  collection.schema.removeField("ny8ao3jr")

  // remove
  collection.schema.removeField("nabicm8q")

  // remove
  collection.schema.removeField("6zozgkxy")

  // remove
  collection.schema.removeField("ez6cyqqj")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnaj3l1dleqv926")

  collection.options = {
    "query": "SELECT engine_availability.engine_id, engine_availability.status, engine_availability.date_performed, (ROW_NUMBER() OVER(partition BY engine_availability.engine_id ORDER BY engine_availability.created DESC)) AS HistoryNumber, (ROW_NUMBER() OVER()) AS id FROM engine_availability"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ny8ao3jr",
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
    "id": "nabicm8q",
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
    "id": "6zozgkxy",
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
    "id": "ez6cyqqj",
    "name": "HistoryNumber",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("ghdngqm8")

  // remove
  collection.schema.removeField("huynpwae")

  // remove
  collection.schema.removeField("euhrw8nq")

  // remove
  collection.schema.removeField("s4lztsg9")

  return dao.saveCollection(collection)
})
