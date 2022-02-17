const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema(
    {
        userId:{type: String, required:true, unique:true},
        invoiceId: {type: String},
        products: [
            {
                productId: {
                    type:String
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
                size : {
                    type: String
                }
            },
        ],
        gross_amount: {type:Number, required: true},
        customerDetail: [
            {
                name: {type: String, required:true},
                email : {type: String, required:true},
                phone : {type: String}
            }
        ],
        address: {type: String, required: true },
        status: {type: String, default: "pending"},
        resi: {type: String}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Order", OrderSchema)

// 
