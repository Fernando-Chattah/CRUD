const Products = require('../../mongo/module/product');

const createproduct = async (req, res) => {
  try {
    const { title, desc, price, images, userId } = req.body;
    const product = await Products.create({
      title,
      desc,
      price,
      images,
      user: userId
    })
    res
      .send({ status: 'OK',data: product, message: 'Producto Creado' });
  } catch (e) {
    res
      .status(400)
      .send({ status: 'ERROR', message: e.message });
  }
}

const deleteproduct = (req, res) => {}

const getproducts = async (req, res) => {
  try {
    const product = await Products.find({
      //price: { $gt: 3 }
      //price: { $lt: 3 }
    })
      // metodo para recuperar los datos de la coleccion usuario
      .populate('user','username email data role')
      // metodo para seleccionar los campos a recuperar
      .select('title desc price');
    res.send({ status: 'OK',data: product });
  } catch (e) {
    res
      .status(400)
      .send({ status: 'ERROR', message: e.message });
  }
}

const getProductsByUser = async (req, res) => {
  try {
    const product = await Products.find({
      user: req.params.userId
    })
      // metodo para recuperar los datos de la coleccion usuario
      .populate('user','username email data role')
      // metodo para seleccionar los campos a recuperar
      .select('title desc price');
    res.send({ status: 'OK',data: product });
  } catch (e) {
    res
      .status(400)
      .send({ status: 'ERROR', message: e.message });
  }
}

module.exports = {
  createproduct,
  deleteproduct,
  getproducts,
  getProductsByUser
}
