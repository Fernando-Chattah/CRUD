// Dependencia para el manejo de DB
const mongoose = require('mongoose');

// Se obtiente todas las propiedades del Schema de mongoose
//const Schema = mongoose.Schema;
// Usando Destructuring
const { Schema } = mongoose;

// Se define la estructura del Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  data: {
    age: {
      type: Number
    },
    isMale: {
      type: Boolean
    }
  },
  role: { type: String, enum: ['admin', 'seller'], default: 'seller' }
});

// Grabo la definicion de la base de datos en una constante
const usuarioDb = mongoose.model('User', userSchema);

// Lo exporto para que el mismo pueda ser utilizado
module.exports = usuarioDb;
