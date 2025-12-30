const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticate = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const user = await User.findById(payload.sub).populate('role');
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

exports.authorizePermissions = (requiredPermissions = []) => {
  return (req, res, next) => {
    const role = req.user?.role;
    if (!role) {
      return res.status(403).json({ message: 'No role assigned' });
    }
    const perms = role.permissions || {};
    const hasAll = requiredPermissions.every((p) => perms[p]);
    if (!hasAll) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }
    next();
  };
};

exports.requireSuperAdmin = (req, res, next) => {
  if (!req.user || req.user.role.name !== 'SuperAdmin') {
    return res.status(403).json({ message: 'SuperAdmin only' });
  }
  next();
};
