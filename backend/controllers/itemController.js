const Product = require('../models/itemModel')

const postProduct = async(req, res)=>{
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getProducts = async(req,res)=>{
    try {
        const products = await Product.find();
        res.json({
            error: false,
            messsage: 'Data fetched successfully',
            data: products
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateProduct = async(req,res)=>{
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteProduct = async(req,res)=>{
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getProducts,
    postProduct,
    deleteProduct,
    updateProduct,
}