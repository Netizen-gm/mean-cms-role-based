const Role = require('../models/Role')
exports.create = async function(req,res){
  const { name, permissions } = req.body
  const r = await Role.create({ name, permissions })
  res.json(r)
}
exports.update = async function(req,res){
  const id = req.params.id
  const { permissions } = req.body
  const r = await Role.findByIdAndUpdate(id, { permissions }, { new: true })
  res.json(r)
}
exports.list = async function(req,res){
  const roles = await Role.find()
  res.json(roles)
}
exports.accessMatrix = async function(req,res){
  const roles = await Role.find()
  res.json(roles)
}
