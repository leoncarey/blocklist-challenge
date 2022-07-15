const mongoose = require('mongoose')

class MongoRepository {
  static createConnectionMiddleware (req, _res, next) {
    const urlString = process.env.MONGO_URL
    mongoose.connect(urlString)
    next()
  }

  static ping () {
    return mongoose.connection.readyState
  }
}

module.exports = MongoRepository
