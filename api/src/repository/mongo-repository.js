const mongoose = require('mongoose')
const Users = require('../models/users')

class MongoRepository {
  static createConnectionMiddleware (req, _res, next) {
    const urlString = process.env.MONGO_URL
    mongoose.connect(urlString)
    next()
  }

  static ping () {
    return mongoose.connection.readyState
  }

  static findMany (parameters) {
    const filter = {}

    if (parameters.isBlocked !== undefined) filter.blocked = parameters.isBlocked

    if (parameters.document !== undefined) filter.document = parameters.document

    const sortKey = parameters.orderFilter || 'order'

    const options = {
      limit: parameters.limit || 10,
      skip: parameters.offset || 0,
      sort: {
        [sortKey]: parameters.order || 'ASC'
      }
    }

    return Users.find(filter, null, options)
  }
}

module.exports = MongoRepository
