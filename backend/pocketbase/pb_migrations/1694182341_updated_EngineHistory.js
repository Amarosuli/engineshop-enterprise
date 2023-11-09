/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnaj3l1dleqv926")

  collection.options = {
    "query": "SELECT engine_id, status, (ROW_NUMBER() OVER()) as id FROM (\nSELECT engine_availability.engine_id, engine_availability.status, (ROW_NUMBER() OVER(partition by engine_availability.engine_id order by engine_availability.created ASC)) as HN, (ROW_NUMBER() OVER()) as id FROM engine_availability\n  )\nWHERE HN=1"
  }

  // remove
  collection.schema.removeField("hga83z1f")

  // remove
  collection.schema.removeField("snlqinfu")

  // remove
  collection.schema.removeField("as1jmgie")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kocoutc5",
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
    "id": "mev1cbaz",
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
    "query": "SELECT engine_availability.engine_id, engine_availability.status, (ROW_NUMBER() OVER(partition by engine_availability.engine_id order by engine_availability.created ASC)) as HN, (ROW_NUMBER() OVER()) as id FROM engine_availability"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hga83z1f",
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
    "id": "snlqinfu",
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
    "id": "as1jmgie",
    "name": "HN",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("kocoutc5")

  // remove
  collection.schema.removeField("mev1cbaz")

  return dao.saveCollection(collection)
})
