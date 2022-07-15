const { MongoClient } = require('mongodb')

class MongoRepository {
  static async getDatabase () {
    const dbConnection = await _getConnection()
    return dbConnection.db(process.env.MONGO_DB_NAME)
  }

  static async ping () {
    const database = await MongoRepository.getDatabase()
    return database.command({ ping: 1 })
  }
}

const _getConnection = () => {
  const urlString = process.env.MONGO_URL
  return MongoClient.connect(urlString)
}

module.exports = MongoRepository
