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

const getProducts = async (req, res) => {
    try {
       
        const { search } = req.query;
        let query = {};

        if (search) {
            query = {
                $or: [
                    { Handle: { $regex: search, $options: "i" } },
                    { Title: { $regex: search, $options: "i" } },
                    // { Body: { $regex: search, $options: "i" } },
                    { Vendor: { $regex: search, $options: "i" } },
                    { Type: { $regex: search, $options: "i" } },
                    { Tags: { $regex: search, $options: "i" } },
                    { "Option1 Name": { $regex: search, $options: "i" } },
                    { "Option1 Value": { $regex: search, $options: "i" } },
                    { "Option2 Name": { $regex: search, $options: "i" } },
                    { "Option2 Value": { $regex: search, $options: "i" } },
                    { "Option3 Name": { $regex: search, $options: "i" } },
                    { "Option3 Value": { $regex: search, $options: "i" } },
                    { "Variant SKU": { $regex: search, $options: "i" } },
                    { "Variant Inventory Tracker": { $regex: search, $options: "i" } },
                    { "Variant Inventory Policy": { $regex: search, $options: "i" } },
                    { "Variant Fulfillment Service": { $regex: search, $options: "i" } },
                    { "Variant Price": { $regex: search, $options: "i" } },
                    { "Variant Compare At Price": { $regex: search, $options: "i" } },
                ],
            };
        }

        const products = await Product.find(query);

        res.json({
            error: false,
            message: 'Data fetched successfully',
            data: products
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


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
const getProductsbychat = async (req, res) => {
    try {
        const { message } = req.body;
        // if (!message) {
        //     return res.status(400).json({ error: "Query message is required" });
        // }

        let query = {};

        // Extract exact price (e.g., "give me a product for $12")
        const exactPriceMatch = message.match(/\$(\d+(\.\d{1,2})?)/);
        if (exactPriceMatch) {
            query["Variant Price"] = parseFloat(exactPriceMatch[1]);
        }

        // Extract price range (e.g., "find the product below 15 dollar")
        const belowPriceMatch = message.match(/below (\d+)/i);
        if (belowPriceMatch) {
            query["Variant Price"] = { $lt: parseFloat(belowPriceMatch[1]) };
        }

        // Extract color (e.g., "give me a product in black color")
        const colorMatch = message.match(/(black|white|red|blue|green|yellow|zebra)/i);
        if (colorMatch) {
            query.Tags = { $regex: new RegExp(colorMatch[1], "i") };
        }

        // Extract product name (e.g., "show me zebra print product")
        const nameMatch = message.match(/show me (.+?) product/i);
        if (nameMatch) {
            query.Title = { $regex: new RegExp(nameMatch[1], "i") };
        }

        // Fetch products based on query
        const products = await Product.find(query);


        res.json(products);
    } catch (error) {
        console.error("Error processing chat query:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    getProducts,
    postProduct,
    deleteProduct,
    updateProduct,
    getProductsbychat,
}