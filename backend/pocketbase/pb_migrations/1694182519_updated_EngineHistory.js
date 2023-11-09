/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnaj3l1dleqv926")

  collection.options = {
    "query": "SELECT engine_id, status, HN, (ROW_NUMBER() OVER(partition by id order by engine_id ASC)) as id FROM (\nSELECT engine_availability.engine_id, engine_availability.status, (ROW_NUMBER() OVER(partition by engine_availability.engine_id order by engine_availability.created ASC)) as HN, (ROW_NUMBER() OVER()) as id FROM engine_availability\n  )\nWHERE HN=1"
  }

  // remove
  collection.schema.removeField("0uqxbds3")

  // remove
  collection.schema.removeField("fwfmrfkl")

  // remove
  collection.schema.removeField("tbua5jsk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ttccmij2",
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
    "id": "3juuojxt",
    "name": "status",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qpjfwuwy",
    "name": "HN",
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
    "query": "SELECT engine_id, status, HN, (ROW_NUMBER() OVER(partition by engine_id order by engine_id ASC)) as id FROM (\nSELECT engine_availability.engine_id, engine_availability.status, (ROW_NUMBER() OVER(partition by engine_availability.engine_id order by engine_availability.created ASC)) as HN, (ROW_NUMBER() OVER()) as id FROM engine_availability\n  )\nWHERE HN=1"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0uqxbds3",
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
    "id": "fwfmrfkl",
    "name": "status",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tbua5jsk",
    "name": "HN",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("ttccmij2")

  // remove
  collection.schema.removeField("3juuojxt")

  // remove
  collection.schema.removeField("qpjfwuwy")

  return dao.saveCollection(collection)
})
