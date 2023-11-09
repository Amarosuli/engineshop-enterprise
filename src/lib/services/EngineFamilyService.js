import { Method, Table } from './pocketbase'

export class EngineFamilyService {
   // name = 'EngineFamily'
   constructor(dbClient) {
      Object.assign(this, new Method(dbClient, Table.EngineFamily))
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
    * database.EngineFamilyService.create(data)
    * 
    * Update Example
    * database.EngineFamilyService.update(id, data)
    * 
    * Delete Example
    * database.EngineFamilyService.delete(id)
    */
}
