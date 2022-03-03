const Cart = require("../models/Cart")
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();
const CryptoJS = require("crypto-js");

//Create Cart
router.post("/", async (req, res)=>{
    const newCart = new Cart(req.body)
    
    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    }catch(err){
        res.status(500).json(err)
    }
})

router.put("/add/:userId", verifyToken, async (req, res)=>{
    let product = { "productId": req.body.products.productId, "size": req.body.products.size, "quantity": req.body.products.quantity, "price": req.body.products.price, "image": req.body.products.image}
    const addProduct = await Cart.findOneAndUpdate(
        {userId: req.body.userId }, {$push: {products:[product]}}
    )
    
    try{
        res.status(200).json(addProduct);
    }catch(err){
        res.status(500).json(err)
    }
})

// Put (Update Account Information)
router.put("/:id", verifyTokenAndAuthorization, async (req, res)=>{
    try{
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body
            },
            { new: true }
        );
        res.status(200).json(updatedCart)
    }catch(err){
        res.status(500).json(err);
    }
});


//Delete (Delete an Account (admin only))
router.delete("/:id", verifyTokenAndAuthorization, async (req, res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been deleted!")
    }catch(err){
        res.status(500).json(err)
    }
});

//Get (Querying User Cart)
router.get("/find/:userId", verifyToken, async (req, res)=>{
    try{
        const cart = await Cart.find({userId: req.params.userId})
        res.status(200).json(cart);

    }catch(err){
        res.status(500).json(err)
    }
});

//Get (Querying All User Account (admin only))
router.get("/", verifyTokenAndAdmin, async (req, res)=>{
    try{
        const cart = await Cart.find()
        res.status(200).json(cart)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;