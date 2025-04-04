const mongoose = require("mongoose");
const Cart = require("./bagSchema");
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    image:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    description:{

        type: String,
        require:true,
    },
    price:{
        type:Number,
        require:true,
        min:[10]
    },


    shop:{
       type:String,
       require:true,
       default:"ajay's store🙂"
    }

});
const Card = mongoose.model("Card", cardSchema);
module.exports = Card;
