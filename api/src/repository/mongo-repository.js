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
}

module.exports = MongoRepository
