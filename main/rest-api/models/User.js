const { text } = require("express");
const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        username:{type: String, required:true, unique:true},
        fullName: {type: String, required: true, text: true},
        image: {type: String},
        email:{type: String, required: true, unique:true},
        password:{type: String, required: true},
        notelp:{type: String, required: true},
        addresses:[
            {
                name:{
                    type: String
                },

                address:{
                    type: String
                }
            }
        ],

        isAdmin:{
            type: Boolean,
            default: false,
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema)