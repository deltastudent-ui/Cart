const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dresSchema = new Schema({
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

const Dres = mongoose.model("Dres", dresSchema);
module.exports = Dres;
