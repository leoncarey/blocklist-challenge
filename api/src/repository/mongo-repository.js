const { ObjectID } = require('mongodb')

class MongoRepository {
  static setRepository (database) {
    this.database = database
    return this
  }

  static ping () {
    return this.database.command({ ping: 1 })
  }

  static async findWithPagination (parameters, collection) {
    const filter = {}
    if (parameters.isBlocked !== undefined) filter.blocked = parameters.isBlocked
    if (parameters.document !== undefined) filter.document = parameters.document

    const aggregateQuery = [
      {
        $facet: {
          data: [
            {
              $match: filter
            }
          ],
          totalCount: [
            {
              $match: filter
            },
            {
              $group: {
                _id: null,
                count: { $sum: 1 }
              }
            }
          ]
        }
      }
    ]

    const sortKey = parameters?.orderFilter || 'order'

    const options = {
      limit: parameters.limit || 10,
      offset: parameters.offset || 0,
      sort: {
        [sortKey]: parameters.order || -1
      }
    }

    if (options.sort) {
      aggregateQuery[0].$facet.data.push({ $sort: options.sort })
    }

    const skip = options.offset * options.limit
    aggregateQuery[0].$facet.data.push({ $skip: skip })

    aggregateQuery[0].$facet.data.push({ $limit: options.limit })

    const resultDatabase = await this.database.collection(collection)
      .aggregate(aggregateQuery)
      .toArray()

    return {
      items: resultDatabase[0].data,
      total: resultDatabase[0].totalCount[0]?.count || 0
    }
  }

  static findOne (filter, collection) {
    return this.database.collection(collection).findOne(filter)
  }

  static async insertOne (value, collection) {
    let datedValue = _insertCreatedAt(value)
    datedValue = _insertLastUpdate(value)

    const options = { returnDocument: 'after', upsert: true }
    const databaseResult = await this.database.collection(collection).insertOne(datedValue, options)

    return databaseResult?.insertedId || null
  }

  static async getLastNextOrderSequence (collection) {
    const sequenceOrder = await this.database.collection(collection)
      .find({}, { sort: { order: -1 } })
      .toArray()

    return sequenceOrder[0]?.order + 1 || null
  }

  static async deleteById (id, collection) {
    const databaseResult = await this.database.collection(collection).deleteOne({ _id: ObjectID(id) })
    return databaseResult.deletedCount > 0
  }
}

const _insertCreatedAt = (value) => {
  if (value.createdAt === undefined) {
    value.createdAt = new Date().toISOString()
  }

  return value
}

const _insertLastUpdate = (value) => {
  value._lastUpdate = new Date().toISOString()
  return value
}

module.exports = MongoRepository
