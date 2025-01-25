import { errors } from './error';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

export const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const getEncryptedPassword = async password => await bcrypt.hash(password, 10);

export const generateToken = payload => {
  const secretKey = process.env.JSON_SECRET_KEY; // Replace with your own secret key
  const options = {
    expiresIn: '24h', // Token expiration time
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
};

export const isPasswordValid = async (password, hashedPassword) =>
  await bcrypt.compare(password, hashedPassword);

export const valiadateRole = roles => {
  return function (req, res, next) {
    if (roles?.find(role => role === req.role)) {
      next();
    } else {
      throw errors.USER_NOT_HAVE_PERMISSION();
    }
  };
};

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token> // No token present
  try{
    if (token == null) throw errors.UNAUTHORIZED();
    const decoded = jwt.verify(token, process.env.JSON_SECRET_KEY);
    if (decoded) {
      req.role = decoded.role;
      req.email = decoded.email;
      next();
    } else {
      req.email = ''
      throw errors.UNAUTHORIZED();
    }
  }catch(err){
    throw errors.UNAUTHORIZED();
  }
};
