import { Method, Table } from './pocketbase'

export class EngineService {
   name = 'Engine'
   constructor(dbClient) {
      Object.assign(this, new Method(dbClient, Table.Engine))
      this.dbClient = dbClient
   }
   getAll = async (options) => {
      return await this.getFullList(options)
   }
   getById = async (id) => {
      return await this.findByFilter('id="' + id + '"')
   }

   /**
    * Create Example
    * database.EngineService.create( data)
    * 
    * Update Example
    * database.EngineService.update( id, data)
    * 
    * Delete Example
    * database.EngineService.delete( id)
    */
}
