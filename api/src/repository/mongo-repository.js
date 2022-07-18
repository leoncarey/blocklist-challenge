const { ObjectId } = require('mongodb')

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
    if (parameters.userName !== undefined) filter.name = parameters.userName

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
      totalCount: resultDatabase[0].totalCount[0]?.count || 0
    }
  }

  static findOne (filterItem, collection) {
    return this.database.collection(collection).findOne(filterItem)
  }

  static async insertOne (value, collection) {
    let datedItem = _insertCreatedAt(value)
    datedItem = _insertLastUpdate(value)

    const options = { returnDocument: 'after', upsert: true }
    const databaseResult = await this.database.collection(collection).insertOne(datedItem, options)

    return databaseResult?.insertedId || null
  }

  static async insertMany (itemList, collection) {
    for (let value of itemList) {
      value = _insertCreatedAt(value)
      value = _insertLastUpdate(value)
    }

    const databaseResult = await this.database.collection(collection).insertMany(itemList)
    return databaseResult
  }

  static async getLastNextOrderSequence (collection) {
    const sequenceOrder = await this.database.collection(collection)
      .find({}, { sort: { order: -1 } })
      .toArray()

    return sequenceOrder[0]?.order + 1 || null
  }

  static async deleteById (id, collection) {
    const databaseResult = await this.database.collection(collection).deleteOne({ _id: ObjectId(id) })
    return databaseResult.deletedCount > 0
  }

  static async deleteMany (filter, collection) {
    const databaseResult = await this.database.collection(collection).deleteMany(filter)
    return databaseResult.deletedCount > 0
  }

  static async updateOne (filter, item, collection) {
    const datedItem = _insertLastUpdate(item)

    const element = {
      $set: datedItem
    }

    const options = {
      returnOriginal: false
    }

    const databaseResult = await this.database.collection(collection).findOneAndUpdate(filter, element, options)
    return databaseResult?.value || null
  }

  static async updateMany (itemList, collection) {
    const operator = []
    for (const value of itemList) {
      const datedItem = _insertLastUpdate(value)

      const itemUpdatable = {
        updateOne: {
          filter: { _id: value._id },
          update: { $set: datedItem }
        }
      }

      operator.push(itemUpdatable)
    }

    const databaseResult = await this.database.collection(collection).bulkWrite(operator)
    return databaseResult?.nModified || null
  }
}

const _insertCreatedAt = (item) => {
  if (item.createdAt === undefined) {
    item.createdAt = new Date().toISOString()
  }

  return item
}

const _insertLastUpdate = (item) => {
  item.updatedAt = new Date().toISOString()
  return item
}

module.exports = MongoRepository
