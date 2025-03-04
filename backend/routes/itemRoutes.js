const {
    getProducts,
    postProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/itemController');
const express = require('express');

const router = express.Router();

router.get('/', getProducts);

router.post('/', postProduct);

router.put('/:id',updateProduct)

router.delete('/:id',deleteProduct)

module.exports = router;
