const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    handle: {  },
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

const Product = mongoose.model("items", productSchema);
module.exports = Product;
