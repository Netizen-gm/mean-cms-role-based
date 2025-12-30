const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Role = require('../models/Role')
const accessSecret = process.env.JWT_ACCESS_SECRET
const refreshSecret = process.env.JWT_REFRESH_SECRET
function signAccess(user){
  return jwt.sign({ id: user._id }, accessSecret, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m' })
}
function signRefresh(user){
  return jwt.sign({ id: user._id }, refreshSecret, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d' })
}
exports.register = async function(req,res){
  const { fullName, email, password, role: roleName } = req.body
  const existing = await User.findOne({ email })
  if(existing) return res.status(400).json({ message: 'Email exists' })
  const role = await Role.findOne({ name: roleName })
  const hashed = await bcrypt.hash(password, 10)
  const user = await User.create({ fullName, email, password: hashed, role: role ? role._id : null })
  const access = signAccess(user)
  const refresh = signRefresh(user)
  res.json({ access, refresh })
}
exports.login = async function(req,res){
  const { email, password } = req.body
  const user = await User.findOne({ email }).populate('role')
  if(!user) return res.status(400).json({ message: 'Invalid' })
  const ok = await bcrypt.compare(password, user.password)
  if(!ok) return res.status(400).json({ message: 'Invalid' })
  const access = signAccess(user)
  const refresh = signRefresh(user)
  res.json({ access, refresh })
}
exports.refresh = async function(req,res){
  const { token } = req.body
  if(!token) return res.status(400).json({ message: 'No token' })
  try{
    const payload = jwt.verify(token, refreshSecret)
    const user = await User.findById(payload.id)
    if(!user) return res.status(401).json({ message: 'Invalid' })
    const access = signAccess(user)
    res.json({ access })
  }catch(err){
    return res.status(401).json({ message: 'Invalid' })
  }
}
exports.seed = async function(req,res){
  const existing = await Role.findOne({ name: 'SuperAdmin' })
  if(existing) return res.json({ message: 'Seed already run' })
  const roles = [
    { name: 'SuperAdmin', permissions: ['create','edit','delete','publish','view'] },
    { name: 'Manager', permissions: ['create','edit','publish','view'] },
    { name: 'Contributor', permissions: ['create','edit','view'] },
    { name: 'Viewer', permissions: ['view'] }
  ]
  const created = await Role.insertMany(roles)
  const pw = await bcrypt.hash('Password123!', 10)
  const users = [
    { fullName: 'Super Admin', email: 'super@demo.com', password: pw, role: created.find(r=>r.name==='SuperAdmin')._id },
    { fullName: 'Manager User', email: 'manager@demo.com', password: pw, role: created.find(r=>r.name==='Manager')._id },
    { fullName: 'Contributor User', email: 'contrib@demo.com', password: pw, role: created.find(r=>r.name==='Contributor')._id },
    { fullName: 'Viewer User', email: 'viewer@demo.com', password: pw, role: created.find(r=>r.name==='Viewer')._id }
  ]
  await User.insertMany(users)
  res.json({ message: 'Seeded' })
}
