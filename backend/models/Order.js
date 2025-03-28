const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    id: { type: String, required: true },
    items: [
        {
            id: { type: String, required: true },
            name: { type: String, required: true },
            image: { type: String, required: false },
            category: { type: String, required: true },
            new_price: { type: Number, required: true },
            old_price: { type: Number, required: true },
        }
    ],
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
