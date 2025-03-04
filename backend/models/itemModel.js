const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    handle: { type: String, required: true, unique: true },
    title: {},
    body: {},
    vendor: {},
    tags: {},
    options: [{}], // Array of objects, allowing flexible structures
    variant: {
        sku: {},
        grams: {},
        inventoryTracker: {},
        inventoryQty: {},
        inventoryPolicy: {},
        fulfillmentService: {},
        price: {},
        compareAtPrice: {}
    },
    imageSrc: {}
}, { strict: false }); // Allow any additional fields

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
