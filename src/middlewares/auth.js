/* eslint-disable no-throw-literal */
const jwt = require('jsonwebtoken');

const isValidHostname = (req, res, next) => {
  const validHost = ['localhost'];
  if (!validHost.includes(req.hostname)) {
    res
      .status(403)
      .send({ status: 'ACCESS_DENIED' })
  }
  next();
};

const isAuth = (req, res, next) => {
  try {
    const { token } = req.headers
    if (token) {
      const data = jwt.verify(token, process.env.JWT_SECRET)
      // Se crea el objeto en donde va a contener la informacion del token
      req.sessionData = { userId: data.userId, role: data.role }
      next();
    } else {
      throw {
        code: 403,
        status: 'ACCESS_DENIED',
        message: 'Missing Token'
      }
    }
  } catch (e) {
    res
      .status(e.code || 500)
      .send({ status: e.status || 'ERROR', message: e.message })
  }
};

const isAdmin = (req, res, next) => {
  try {
    const { role } = req.sessionData
    if (role != 'admin') {
      throw {
        code: 403,
        status: 'ACCESS_DENIED',
        message: 'Invalid Role'
      }
    }
    next();
  } catch (e) {
    res
      .status(e.code || 500)
      .send({ status: e.status || 'ERROR', message: e.message })
  }
};

module.exports = {
  isValidHostname,
  isAuth,
  isAdmin
};
