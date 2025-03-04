const express = require('express');
const router = express.Router();
const productRouter = require('./itemRoutes');

router.use( '/products',productRouter);

module.exports =router;