const { MongoClient } = require('mongodb')

class MongoConnection {
  static async getConnection () {
    this.dbConnection = await _connect()
    return this.dbConnection.db(process.env.MONGO_DB_NAME || 'blocklist-challenge-db')
  }
}

const _connect = () => {
  const urlString = process.env.MONGO_URL || 'mongodb://127.0.0.1/blocklist-challenge-db'
  return MongoClient.connect(urlString)
}

module.exports = MongoConnection
