const { mongoConfig } = require('../../src/constants')

const _insertOne = (connection, item) => connection.collection(mongoConfig.COLLECTION).insertOne(item)
const _insertMany = (connection, itemsList) => connection.collection(mongoConfig.COLLECTION).insertMany(itemsList)

const _findOne = (connection, filterItem) => connection.collection(mongoConfig.COLLECTION).findOne(filterItem)
const _findMany = (connection, filterItems, options) => connection.collection(mongoConfig.COLLECTION).find(filterItems, options)
  .toArray()

const _deleteOne = (connection, _id) => connection.collection(mongoConfig.COLLECTION).deleteOne({ _id })
const _deleteMany = (connection, filterDelete) => connection.collection(mongoConfig.COLLECTION).deleteMany(filterDelete)

module.exports = {
  _deleteMany,
  _deleteOne,
  _findMany,
  _findOne,
  _insertMany,
  _insertOne
}
