const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema(
    {
        userId: {
            type: String, 
        },

        products: [
            {
                productId: { type:String },
                size: { type: String, default: "S" },
                quantity: { type: Number, default: 1, },
                price: { type: Number },
                image: { type: String }
            },
        ],
    },
    {timestamps: true}
);

module.exports = mongoose.model("Cart", CartSchema)