const Order = require("../models/Order")
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();
const CryptoJS = require("crypto-js");
const midtransClient = require('midtrans-client');
const Cart = require("../models/Cart");

//Checkout (Get Midtrans Token)
let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: '',
    clientKey: ''
});


//Create ordrr + Req Midtrans Token
router.post("/add", verifyToken, async (req, res)=>{
    const newOrder = new Order(req.body)

    let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey : 'MIDTRANS_SERVER_KEY',
        clientKey : 'MIDTRANS_CLIENT_KEY'
    })

    const parameter = {
        "transaction_details": {
            "order_id": req.body.invoiceId,
            "gross_amount": req.body.totalprice
        },
        "credit_card": {
            "secure" : true
        }
    }


    try{
        snap.createTransaction(parameter).then((transaction)=>{
            let transactionToken = transaction.token;
            newOrder.paymentToken = (transactionToken)
        })

        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    }catch(err){
        res.status(500).json(err)
    }
})

router.put("/add/address/:invoiceId", verifyToken, async (req, res) =>{
    let address = { "address" : req.body.address}
    let customer = { "name": req.body.customerDetail.name, "phone": req.body.customerDetail.phone, "email": req.body.customerDetail.email,}
    const addAddress = await Cart.findByIdAndUpdate(
        {
            userId: req.body.invoiceId
        },
        {
            $push: {address: address, customerDetail: [customer]}
        }
    )

    try{
        res.status(200).json(addAddress)
    }catch(err){
        res.status(500).json(err)
    }
})

//Find Invoice 
router.get("/invoice/find/:invoiceId", verifyToken, async (req, res) => {
    try {
        const invoice = await Order.find({invoiceId: req.params.invoiceId})
        res.status(200).json(invoice)
    }catch(err){
        res.status(500).json(err)
    }
})

// Put (Update Account Information)
router.put("/:id", verifyTokenAndAdmin, async (req, res)=>{
    try{
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body
            },
            { new: true }
        );
        res.status(200).json(updatedOrder)
    }catch(err){
        res.status(500).json(err);
    }
});


//Delete (Delete an Account (admin only))
router.delete("/:id", verifyTokenAndAdmin, async (req, res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted!")
    }catch(err){
        res.status(500).json(err)
    }
});

//Get (Querying User Account (admin only))
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res)=>{
    try{
        const order = await Order.find({userId: req.params.userId})
        res.status(200).json(order);

    }catch(err){
        res.status(500).json(err)
    }
});

//Get (Querying All User Account (admin only))
router.get("/", verifyTokenAndAdmin, async (req, res)=>{
    try{
        const order = await Order.find()
        res.status(200).json(order)
    }catch(err){
        res.status(500).json(err)
    }
})

//Stats Monthly Income

router.get("/income", verifyTokenAndAdmin, async (req, res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1));

    try{
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);
        res.status(200).json(income);
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;