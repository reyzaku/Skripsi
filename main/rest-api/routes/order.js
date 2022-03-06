const Order = require("../models/Order")
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();
const midtransClient = require('midtrans-client');

//Create order + Req Midtrans Token
router.post("/add", async (req, res)=>{
    const newOrder = new Order(req.body)

    try{
        const savedOrder = await newOrder.save();
        console.log("saved Order : " + savedOrder)
        res.status(200).json(savedOrder);
    }catch(err){
        res.status(500).json(err)
    }
})

router.put("/add/address/:id", async (req, res) =>{
    Order.findOneAndUpdate(
        {invoiceId: req.params.id},
        {
            $set: {
                address: req.body.address,
                name : req.body.name,
                email : req.body.email,
                phone : req.body.phone
            }
        },
        {new: true},
        (err, doc) => {
            if(err) {
                res.status(200).json(err)
            }
            res.status(500).json(doc)
        }
    )

    // try{
    //     res.status(200).json(addAddress)
    // }catch(err){
    //     res.status(500).json(err)
    // }
})

router.put("/add/token/:id", (req, res) =>{
    let payload = {}
    let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey : process.env.MIDTRANS_SERVER_KEY,
        clientKey : process.env.MIDTRANS_CLIENT_KEY
    })

    console.log(req.params.id)

    const parameter = {
        "transaction_details": {
            "order_id": req.params.id,
            "gross_amount": req.body.gross_amount
        }
    }
    
    snap.createTransaction(parameter).then(async(transaction)=>{
        let transactionToken = transaction.token;
        let redirectUrl = transaction.redirect_url
        payload.token = transactionToken
        payload.url = redirectUrl
        
        Order.findOneAndUpdate(
            {invoiceId: req.params.id},
            {
                $set: {paymentToken: payload.token, redirect_url: payload.url}
            },
            { new: true },
            (err, doc) => {
                if(err) {
                    res.status(200).json(err)
                }
                res.status(500).json(doc)
            }
        )
        // try{
        //     res.status(200).json(Order)
        // }catch(err){
        //     res.status(500).json(err)
        // }
    })
    
})

router.get("/find/:id", async (req, res)=>{
    try{
        const order = await Order.findOne({invoiceId: req.params.id})
        res.status(200).json(order);
    }catch(err){
        res.status(500).json(err)
    }
});
//Find Invoice 
// router.get("/find/:id", async (req, res) => {

//     Order.find({invoiceId: req.params.id}, (error, data) => {
//         if(error){
//             res.status(500).json(error)
//         }else {
//             res.status(200).json(data)
//         }
//     })

//     // try {
//     //     const invoice = await Order.find({invoiceId: req.params.invoiceId})
//     //     res.status(200).json(invoice)
//     // }catch(err){
//     //     res.status(500).json(err)
//     // }
// })

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

// //Get (Querying User Account (admin only))
// router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res)=>{
//     try{
//         const order = await Order.find({userId: req.params.userId})
//         res.status(200).json(order);

//     }catch(err){
//         res.status(500).json(err)
//     }
// });

//Get (Querying All User Account (admin only))
router.get("/", async (req, res)=>{
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