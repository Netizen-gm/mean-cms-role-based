const Article = require('../models/Article')
exports.create = async function(req,res){
  const { title, body } = req.body
  const image = req.file ? req.file.path : null
  const article = await Article.create({ title, body, image, author: req.user._id })
  res.json(article)
}
exports.update = async function(req,res){
  const id = req.params.id
  const { title, body } = req.body
  const article = await Article.findById(id)
  if(!article) return res.status(404).json({ message: 'Not found' })
  if(article.author.toString() !== req.user._id.toString() && req.user.role.name !== 'SuperAdmin' && !req.user.role.permissions.includes('edit')) return res.status(403).json({ message: 'Forbidden' })
  article.title = title || article.title
  article.body = body || article.body
  await article.save()
  res.json(article)
}
exports.delete = async function(req,res){
  const id = req.params.id
  const article = await Article.findById(id)
  if(!article) return res.status(404).json({ message: 'Not found' })
  if(article.author.toString() !== req.user._id.toString() && req.user.role.name !== 'SuperAdmin' && !req.user.role.permissions.includes('delete')) return res.status(403).json({ message: 'Forbidden' })
  await article.remove()
  res.json({ message: 'Deleted' })
}
exports.publish = async function(req,res){
  const id = req.params.id
  const { publish } = req.body
  const article = await Article.findById(id)
  if(!article) return res.status(404).json({ message: 'Not found' })
  article.status = publish ? 'published' : 'draft'
  if(publish) article.publishedAt = new Date()
  await article.save()
  res.json(article)
}
exports.list = async function(req,res){
  const filter = {}
  if(req.user.role.name === 'Viewer') filter.status = 'published'
  const articles = await Article.find(filter).populate('author')
  res.json(articles)
}
exports.get = async function(req,res){
  const id = req.params.id
  const article = await Article.findById(id).populate('author')
  if(!article) return res.status(404).json({ message: 'Not found' })
  if(article.status !== 'published' && req.user.role.name === 'Viewer') return res.status(403).json({ message: 'Forbidden' })
  res.json(article)
}
