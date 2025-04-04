const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongosh = require("passport-local-mongoose");

const usershema = new Schema({
    email:{
        type: String,
        require: true,
        unique: true, //Prevent duplicate emails
        match: [/.+@.+\..+/, "Please enter a valid email"], // Validate email format
    },
    item:[{
        type:Schema.Types.ObjectId,
       ref:"Card"
    }],

    address:{
        type:Schema.Types.ObjectId,
        ref:"Cart"
    }
});

usershema.plugin(passportLocalMongosh);

module.exports = mongoose.model("User", usershema);
