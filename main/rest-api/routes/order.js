const Order = require("../models/Order")
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();
const CryptoJS = require("crypto-js");
const midtransClient = require('midtrans-client')

//Checkout (Get Midtrans Token)
let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: '',
    clientKey: ''
});

//Create Product
router.post("/", verifyToken, async (req, res)=>{
    const newOrder = new Order(req.body)
    
    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
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