const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema(
    {
        userId:{type: String, required:true, unique:true},
        invoiceId: {type: Number, default: 000, autoIncrement: true},
        products: [
            {
                productId: {
                    type:String
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
        gross_amount: {type:Number, required: true},
        customerDetail: [
            {
                firstname: {type: String, required:true},
                first_name : {type: String},
                email : {type: String, required:true},
                phone : {type: String}

            }
        ],
        address: {type: Object, required: true },
        status: {type: String, default: "pending"},
        resi: {type: String}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Order", OrderSchema)

// 
