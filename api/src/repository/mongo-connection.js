const { MongoClient } = require('mongodb')

class MongoConnection {
  static async getConnection () {
    this.dbConnection = await _connect()
    return this.dbConnection.db(process.env.MONGO_DB_NAME || 'neoway-fullstack-db')
  }
}

const _connect = () => {
  const urlString = process.env.MONGO_URL || 'mongodb://127.0.0.1/neoway-fullstack-db'
  return MongoClient.connect(urlString)
}

module.exports = MongoConnection
