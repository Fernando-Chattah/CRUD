// Dependencia para el manejo de DB
const mongoose = require('mongoose');

// Se obtiente todas las propiedades del Schema de mongoose
//const Schema = mongoose.Schema;
// Usando Destructuring
const { Schema } = mongoose;

// Se define la estructura del Schema
const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  images: [
    {
      type: String,
      required: true
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    required: true
  }

},
{
  timestamps: true
}
);

const productoDb = mongoose.model('Product', productSchema);

module.exports = productoDb;
