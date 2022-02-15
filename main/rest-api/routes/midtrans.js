const router = require("express").Router();
const { Snap } = require("midtrans-client");
const midtransClient = require('midtrans-client')

router.post("/", verifyToken, async (req, res)=>{
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



