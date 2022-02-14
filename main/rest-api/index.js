const express = require("express");
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoute = require("./routes/user")
const productRoute = require("./routes/product")
const authRoute = require("./routes/auth")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")
const cors = require("cors")


app.use(
    cors({
        origin: "*"
    })
)

dotenv.config();

mongoose
.connect(process.env.MONGO_URL)
.then(() =>console.log("DBConnection Succesfull!"))
.catch((err) => {
    console.log(err);
});
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);



app.listen(5000, ()=>{
    console.log("Succesfully Running!")
});

