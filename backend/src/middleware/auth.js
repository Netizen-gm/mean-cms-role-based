const jwt = require('jsonwebtoken')
const User = require('../models/User')
const accessSecret = process.env.JWT_ACCESS_SECRET
module.exports = async function(req,res,next){
  const auth = req.headers.authorization
  if(!auth) return res.status(401).json({ message: 'No token' })
  const token = auth.split(' ')[1]
  try{
    const payload = jwt.verify(token, accessSecret)
    const user = await User.findById(payload.id).populate('role')
    if(!user) return res.status(401).json({ message: 'Invalid token' })
    req.user = user
    next()
  }catch(err){
    return res.status(401).json({ message: 'Invalid token' })
  }
}
