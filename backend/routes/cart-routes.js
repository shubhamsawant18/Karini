const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart-controller");
const validateToken = require('../middleware/isLoggedIn');

router.use(validateToken);
router.get("/", cartController.getCartItems);


router.post("/", (req, res, next) => {
    console.log("Received POST request to /api/cart");
    next();
  }, cartController.addCartItem);
  


router.put("/:id", cartController.updateCartItem);


router.delete("/:id", cartController.deleteCartItem);

module.exports = router;
