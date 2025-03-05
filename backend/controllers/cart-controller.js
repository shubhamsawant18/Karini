const Cart = require("../models/cart-model"); // Corrected the require path

// GET all cart items
exports.getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find().populate("productId userId"); // Populate both product & user data

    if (!cartItems.length) {
      return res.status(404).json({ message: "No cart items found" });
    }

    res.status(200).json(cartItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST a new item to cart
exports.addCartItem = async (req, res) => {
  try {
    const { userId, productId, quantity, address } = req.body;

    if (!userId || !productId || !quantity || !address) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newItem = new Cart({ userId, productId, quantity, address });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT (update) a cart item
exports.updateCartItem = async (req, res) => {
  try {
    const { quantity, address } = req.body;

    if (quantity && quantity < 1) {
      return res.status(400).json({ error: "Quantity must be at least 1" });
    }

    const updatedItem = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // Ensures schema validation
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE a cart item
exports.deleteCartItem = async (req, res) => {
  try {
    const deletedItem = await Cart.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
