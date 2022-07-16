const { MongoClient } = require('mongodb')

class MongoConnection {
  static async getConnection () {
    this.dbConnection = await _connect()
    return this.dbConnection.db(process.env.MONGO_DB_NAME)
  }
}

const _connect = () => {
  const urlString = process.env.MONGO_URL
  return MongoClient.connect(urlString)
}

module.exports = MongoConnection
