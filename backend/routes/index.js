const express = require('express');
const router = express.Router();
const productRouter = require('./itemRoutes');
const userRoutes = require('./usersRouter');
router.use( '/products',productRouter);
router.use('/users',userRoutes);

module.exports =router;