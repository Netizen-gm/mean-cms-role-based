module.exports = function(requiredPermission){
  return function(req,res,next){
    const role = req.user.role
    if(!role) return res.status(403).json({ message: 'No role assigned' })
    const perms = role.permissions || []
    if(perms.includes(requiredPermission)){
      return next()
    }
    return res.status(403).json({ message: 'Forbidden' })
  }
}
