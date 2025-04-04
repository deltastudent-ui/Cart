const mongoose = require("mongoose");
const user = require("./user");
const Card = require("./cardSchema");

const cartSchema = new mongoose.Schema({
   
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    name:{
        type: String,
        require:true,

    },
    mobileNo :{
     type:Number, 
    require: true,
    }, 

    area:{
        type:String,
        retquire:true
    },

    pincode:{
        type:Number,
        require:true,
    },
    state:{
        type:String,
        require:true,
    },
   
    destrict:{
        type:String,
        require:true,
    },
    addedAt: { 
        type: Date, 
        default: Date.now 
    }
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
