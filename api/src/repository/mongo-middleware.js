const MongoConnection = require('./mongo-connection')
const MongoRepository = require('./mongo-repository')

class MongoMiddleware {
  static async setMongoApplication (req, _res, next) {
    const dbConnection = await MongoConnection.getConnection()
    const mongoRepository = await MongoRepository.setRepository(dbConnection)

    if (!req.mongo) req.mongo = {}
    req.mongo = mongoRepository

    next()
  }
}

module.exports = MongoMiddleware
