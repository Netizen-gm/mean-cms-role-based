const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ArticleSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  image: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['draft','published'], default: 'draft' },
  publishedAt: { type: Date }
}, { timestamps: true })
module.exports = mongoose.model('Article', ArticleSchema)
