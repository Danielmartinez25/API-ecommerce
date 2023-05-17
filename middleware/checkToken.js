const errorResponse = require("../helpers/errorResponse");
const { verify } = require("jsonwebtoken");
const createError = require("http-errors");
const User = require("../database/models/user");
const Role = require("../database/models/role");

const checkToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw createHttpError(401, "Se requiere un token");
    }
    const token = req.headers.authorization;
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("name");
    next();
  } catch (error) {
    return errorResponse(res, error, "CHECK-TOKEN");
  }
};

const verifyIsModerator = async (req,res,next) => {
  try {
  const user = await User.findById(req.user._id)
  const roles = await Role.find({_id : {$in : user.roles}})
  for (let i = 0; i < roles.length; i++) {
    if(roles.length[i] === 'moderator'){
      next()
      return;
    }
  }
  return res.status(403).json({message : 'Require Moderator role'})
  } catch (error) {
    console.log(error)
  }
}
const verifyIsAdmin = async () => {
  try {
    const user = await User.findById(req.user._id)
    const roles = await Role.find({ _id: { $in: user.roles } })
    for (let i = 0; i < roles.length; i++) {
      if (roles.length[i] === 'admin') {
        next()
        return;
      }
    }
    return res.status(403).json({ message: 'Require Admin role' })
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  checkToken,
  verifyIsAdmin, 
  verifyIsModerator
} 
