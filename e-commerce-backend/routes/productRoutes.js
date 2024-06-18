const { Router } = require('express');
const productController = require('../controllers/productController');
const { authentication } = require('../middlewares/userAuthentication');
const route = Router();

route.post('/post', authentication, productController.createProduct);
route.get('/get', productController.getAllProducts);
route.get('/userproducts/:id',authentication,productController.getUserProducts)
route.get('/get/:id', productController.getProductById);
route.put('/update/:id', authentication, productController.updateProduct);
route.delete('/delete/:id', authentication, productController.deleteProduct);

module.exports = route;
