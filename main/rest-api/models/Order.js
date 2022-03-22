const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema(
    {
        userId:{type: String, required:true},
        invoiceId: {type: String, required:true, unique:true},
        products: [],
        gross_amount: {type:Number, required: true},
        name: {type: String},
        email : {type: String},
        phone : {type: String},
        paymentToken: {type: String},
        redirect_url: {type: String},
        address: {type: String},
        status: {type: String, default: "pending"},
        resi: {type: String}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Order", OrderSchema)

// 
