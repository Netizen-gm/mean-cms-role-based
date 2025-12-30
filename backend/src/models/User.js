const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Schema.Types.ObjectId, ref: 'Role' },
  photo: { type: String }
}, { timestamps: true })
module.exports = mongoose.model('User', UserSchema)
