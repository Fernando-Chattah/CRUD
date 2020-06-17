const express = require('express');
const productsController = require('../../controllers/v1/products-controllers');
const router = express.Router();

router.post('/create', productsController.createproduct);
router.post('/delete', productsController.deleteproduct);
router.get('/get-all', productsController.getproducts);
router.get('/get/:userId', productsController.getProductsByUser);

module.exports = router;
