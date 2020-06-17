const bcrypt = require('bcrypt');
const User = require('../../mongo/module/user');
const Product = require('../../mongo/module/product');
const jwt = require('jsonwebtoken');

const expiresIn = 60 * 10;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (user) {
      const isOk = await bcrypt.compare(password, user.password)
      if (isOk) {
        const token = jwt.sign({ userId: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn }
        );
        res.send({
          status: 'OK',
          data: { token, expiresIn }
        })
      } else {
        res
          .status(403)
          .send({ status: 'INVALID_PASSWORD', message: '' })
      }
    } else {
      res
        .status(401)
        .send({ status: 'USER_NOT_FOUND', message: '' })
    }
  } catch (e) {
    res
      .status(500)
      .send({ status: 'ERROR', message: e.message })
  }
}

const createuser = async (req, res) => {
  try {
    console.log(req.body);
    // obtengo los datos del cuerpo
    const { username, email, password, data } = req.body
    // Encripto la clave
    const hash = await bcrypt.hash(password, 10);
    // Guardo el usuario
    await User.create({
      username,
      email,
      password: hash,
      data
    })

    //Creando metodo de instancia
    //const user = new User()
    //user.username = username
    //user.email = email
    //user.password = hash
    //user.data = data
    //await user.date()

    res.send({
      status: 'OK',
      message: 'Usuario Creado'
    });
  } catch (e) {
    // eslint-disable-next-line eqeqeq
    if (e.code && e.code == 11000) {
      res
        .status(400)
        .send({ Status: 'DUPLICATED_VALUES', message: e.keyValue })
      return
    }
    res.status(500).send({ Status: 'Error', message: e.message })
  }
}

const deleteuser = async (req, res) => {
  try {
    const { userId } = req.sessionData
    await User.findByIdAndDelete(userId)
    await Product.deleteMany({ user: userId })
    res.send({ status: 'OK', message: 'usuario eliminado' });
  } catch (e) {
    res.status(500).send({ Status: 'Error', message: e.message })
  }
}

const getusers = async (req, res) => {
  try {
    const users = await User.find().select({password: 0, __v:0, role:0});
    res.send({ status: 'OK', data: users });
  } catch (e) {
    res.status(500).send({ Status: 'Error', message: e.message })
  }
}

const updateuser = async (req, res) => {
  try {
    const { username, email, data } = req.body
    await User.findByIdAndUpdate(req.sessionData.userId, { username, email, data });
  } catch (e) {
    if (e.code && e.code == 11000) {
      res
        .status(400)
        .send({ Status: 'DUPLICATED_VALUES', message: e.keyValue })
      return
    }
    res
      .status(500)
      .send({ status: 'ERROR', message: e.message });
  }
  res.send({ status: 'OK', message: 'usuario actualizado' });
}

module.exports = {
  createuser,
  deleteuser,
  getusers,
  updateuser,
  login
}
