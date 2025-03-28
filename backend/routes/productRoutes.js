const express = require("express");
const Product = require("../models/Product");
const upload = require("../middleware/multerConfig");

const router = express.Router();

// Save new product
router.post("/upload", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const newProduct = new Product({
            id: req.body.id,
            name: req.body.name,
            image: req.file.filename,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
            qty: req.body.qty,
            description: req.body.description,
            available: req.body.available
        });

        const savedItem = await newProduct.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(500).json({ message: "Error saving product" });
    }
});

// Update product quantity
router.put("/update-qty/:id", async (req, res) => {
    try {
        const { qty } = req.body;
        const { id } = req.params;
        const updatedProduct = await Product.findOneAndUpdate(
            { id }, 
            { $inc: { qty } }, 
            { new: true }
        );

        if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error updating quantity" });
    }
});

// Remove product
router.delete("/remove-product/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findOneAndDelete({ id });

        if (!deletedProduct) return res.status(404).json({ message: "Product not found" });

        res.status(200).json({ message: "Product removed successfully", deletedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error removing product" });
    }
});

// Get all products
router.get("/allproduct", async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

module.exports = router;
