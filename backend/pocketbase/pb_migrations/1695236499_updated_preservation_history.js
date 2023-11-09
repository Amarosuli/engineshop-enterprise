/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x9y4ygknk5gu3uw")

  collection.options = {
    "query": "SELECT preservation_list.id, preservation_list.engine_id, engine_list.esn, engine_list.isPreservable, preservation_list.duration, preservation_list.date_performed, preservation_list.tag, preservation_list.material, (ROW_NUMBER() OVER(partition BY preservation_list.engine_id ORDER BY preservation_list.date_performed DESC )) AS history_number FROM preservation_list JOIN engine_list on engine_list.id = preservation_list.engine_id\n"
  }

  // remove
  collection.schema.removeField("wdlei6sg")

  // remove
  collection.schema.removeField("m9xmhvhh")

  // remove
  collection.schema.removeField("pnfex3dy")

  // remove
  collection.schema.removeField("whtsp9zj")

  // remove
  collection.schema.removeField("88umwgke")

  // remove
  collection.schema.removeField("2z9tlyd4")

  // remove
  collection.schema.removeField("utzwzcu1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "luufwsif",
    "name": "engine_id",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "bujuly5k065pzkr",
      "cascadeDelete": false,
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
    "id": "atgzkhgg",
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
    "id": "o4wrzthb",
    "name": "isPreservable",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "e5fmkaij",
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
    "id": "9g0jw7b1",
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
    "id": "1rzvrj3g",
    "name": "tag",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/gif",
        "image/webp"
      ],
      "thumbs": [],
      "protected": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ywmyyzoh",
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
    "id": "xo1wefgh",
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
  const collection = dao.findCollectionByNameOrId("x9y4ygknk5gu3uw")

  collection.options = {
    "query": "SELECT preservation_list.id, preservation_list.engine_id, engine_list.esn, preservation_list.duration, preservation_list.date_performed, preservation_list.tag, preservation_list.material, (ROW_NUMBER() OVER(partition BY preservation_list.engine_id ORDER BY preservation_list.date_performed DESC )) AS history_number FROM preservation_list JOIN engine_list on engine_list.id = preservation_list.engine_id\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wdlei6sg",
    "name": "engine_id",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "bujuly5k065pzkr",
      "cascadeDelete": false,
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
    "id": "m9xmhvhh",
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
    "id": "pnfex3dy",
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
    "id": "whtsp9zj",
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
    "id": "88umwgke",
    "name": "tag",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/gif",
        "image/webp"
      ],
      "thumbs": [],
      "protected": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2z9tlyd4",
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
    "id": "utzwzcu1",
    "name": "history_number",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("luufwsif")

  // remove
  collection.schema.removeField("atgzkhgg")

  // remove
  collection.schema.removeField("o4wrzthb")

  // remove
  collection.schema.removeField("e5fmkaij")

  // remove
  collection.schema.removeField("9g0jw7b1")

  // remove
  collection.schema.removeField("1rzvrj3g")

  // remove
  collection.schema.removeField("ywmyyzoh")

  // remove
  collection.schema.removeField("xo1wefgh")

  return dao.saveCollection(collection)
})
