/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnaj3l1dleqv926")

  collection.options = {
    "query": "SELECT engine_id, status, HN, (ROW_NUMBER() OVER(partition by id order by engine_id DESC)) as id FROM (\nSELECT engine_availability.engine_id, engine_availability.status, (ROW_NUMBER() OVER(partition by engine_availability.engine_id order by engine_availability.created ASC)) as HN, (ROW_NUMBER() OVER()) as id FROM engine_availability\n  )\nWHERE HN=1"
  }

  // remove
  collection.schema.removeField("ttccmij2")

  // remove
  collection.schema.removeField("3juuojxt")

  // remove
  collection.schema.removeField("qpjfwuwy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hs1tdqkk",
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
    "id": "g3gkeww5",
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
    "id": "5uquuuzt",
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
    "query": "SELECT engine_id, status, HN, (ROW_NUMBER() OVER(partition by id order by engine_id ASC)) as id FROM (\nSELECT engine_availability.engine_id, engine_availability.status, (ROW_NUMBER() OVER(partition by engine_availability.engine_id order by engine_availability.created ASC)) as HN, (ROW_NUMBER() OVER()) as id FROM engine_availability\n  )\nWHERE HN=1"
  }

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

  // remove
  collection.schema.removeField("hs1tdqkk")

  // remove
  collection.schema.removeField("g3gkeww5")

  // remove
  collection.schema.removeField("5uquuuzt")

  return dao.saveCollection(collection)
})
