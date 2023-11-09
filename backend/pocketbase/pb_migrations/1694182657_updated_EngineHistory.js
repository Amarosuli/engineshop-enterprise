/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnaj3l1dleqv926")

  collection.options = {
    "query": "WITH EH AS (\nSELECT engine_availability.engine_id, engine_availability.status, (ROW_NUMBER() OVER(partition by engine_availability.engine_id order by engine_availability.created DESC)) as HN, (ROW_NUMBER() OVER()) as id FROM engine_availability )\nSELECT EH.engine_id, EH.status, (ROW_NUMBER() OVER()) as id FROM EH WHERE HN=1"
  }

  // remove
  collection.schema.removeField("htn9jhet")

  // remove
  collection.schema.removeField("6y9tmfcm")

  // remove
  collection.schema.removeField("8fvjox3q")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dgylxaax",
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
    "id": "rv6to7gx",
    "name": "status",
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
    "query": "SELECT engine_availability.engine_id, engine_availability.status, (ROW_NUMBER() OVER(partition by engine_availability.engine_id order by engine_availability.created DESC)) as HN, (ROW_NUMBER() OVER()) as id FROM engine_availability"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "htn9jhet",
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
    "id": "6y9tmfcm",
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
    "id": "8fvjox3q",
    "name": "HN",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("dgylxaax")

  // remove
  collection.schema.removeField("rv6to7gx")

  return dao.saveCollection(collection)
})
