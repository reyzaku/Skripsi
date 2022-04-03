const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema(
    {
        title:{type: String, required:true, text: true},
        desc:{type: String, required: true},
        price:{type: Number, required: true},
        category:{type: Array},
        image:{type: String, required: true},
        size: {type: Array},
        inStock: {type: Boolean, default: false}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Product", ProductSchema)