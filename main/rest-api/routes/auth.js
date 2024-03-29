const router = require("express").Router();
const User = require("../models/User")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

// Register
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,

        email: req.body.email,

        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_HASH
        ).toString(),

        notelp: req.body.notelp,
        fullName: `${req.body.firstName} ${req.body.lastName}`,
        isAdmin: req.body.isAdmin

    });

    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser)
    } catch (err) {
        res.status(500).json(err);
    }

});

// Login

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        });
        !user && res.status(401).json("username yang kamu masukan tidak terdaftar!")

        const passHash = CryptoJS.AES.decrypt(
            user.password, process.env.PASS_HASH
        );

        const OriginPassword = passHash.toString(CryptoJS.enc.Utf8);

        OriginPassword !== req.body.password &&
            res.status(401).json("Password yang kamu masukah salah!");

        const accessToken = jwt.sign(
            {
                id: user.id._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_HASH,
            {
                expiresIn: "3d"
            }
        )

        const { password, ...others } = user._doc;

        res.status(200).json({ ...others, accessToken });

    } catch (err) {
        res.status(500).json(err);
    };
})

module.exports = router;