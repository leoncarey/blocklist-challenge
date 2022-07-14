const { MongoClient } = require('mongodb')

class MongoRepository {
  static async getConnection () {
    const urlString = 'mongo://127.0.0.1:27017'
    this.dbConnection = await MongoClient.connect(urlString)
  }

  static async getDatabase () {
    await this.getConnection()
    return this.dbConnection.db(process.env.MONGO_DB_NAME)
  }

  static ping () {
    const database = this.getDatabase()
    return database.command({ ping: 1 })
  }
}

module.exports = MongoRepository
