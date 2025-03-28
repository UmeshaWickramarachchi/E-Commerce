const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

router.post("/save", async (req, res) => {
    try {
        const { id, items } = req.body;
        if (!id || !items || items.length === 0) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newOrder = new Order({ id, items });
        await newOrder.save();

        res.status(201).json({ message: "Order saved successfully", order: newOrder });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
