const { Schema, default: mongoose } = require('mongoose')

const usersSchema = new Schema({
  blocked: Boolean,
  document: String,
  documentType: String,
  name: String,
  order: Number
}, { timestamps: true })

const Users = mongoose.model('users', usersSchema)

module.exports = Users
