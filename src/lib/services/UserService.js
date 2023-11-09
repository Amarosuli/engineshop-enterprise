import { Method, Table } from './pocketbase'

export class UserService {
   name = 'User'
   constructor(dbClient) {
      Object.assign(this, new Method(dbClient, Table.User))
      this.dbClient = dbClient
   }
   getAll = async (options) => {
      return await this.getFullList(options)
   }
   getById = async (id) => {
      return await this.findByFilter('id="' + id + '"')
   }
   confirm = async (username, password) => {
      try {
         await this.dbClient.collection(this.collectionName).authWithPassword(username, password)
      } catch (error) {
         return { status: error.status, message: 'failed' }
      }
      return { message: 'success' }
   }

   /**
    * Create Example
    * database.EngineUserService.create( data)
    * 
    * Update Example
    * database.EngineUserService.update( id, data)
    * 
    * Delete Example
    * database.EngineUserService.delete( id)
    */
}
