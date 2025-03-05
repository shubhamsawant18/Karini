const express = require("express");
const router = express.Router();
const productRouter = require("./itemRoutes");
const userRoutes = require("./usersRouter");
const cartRoutes = require("./cart-routes"); // Added cart routes

router.use("/products", productRouter);
router.use("/users", userRoutes);
router.use("/cart", cartRoutes); // Added this line to enable cart routes

module.exports = router;
