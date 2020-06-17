const productsRouter = require('./products-route');
const userRouter = require('./users-route');


module.exports = app => {
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/products', productsRouter);
};
