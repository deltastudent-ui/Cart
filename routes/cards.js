const express = require("express");
let path = require("path");
const Card = require("../model/cardSchema")
const User = require("../model/user.js");
let router = express.Router();
const Cart = require("../model/cardSchema.js")
const {cardSchema} = require("../joi.js");

const {CloudinaryStorage} = require("multer-storage-cloudinary");
const multer = require("multer");
const {cloudinary,upload} = require("../config.js");
const isLogedin = ((req,res , next)=>{
    if(!req.isAuthenticated()){
        req.flash("error", "you must be loged in ");
        return res.redirect("/login");
    }
    next();
});




router.get("/", (req,res)=>{
res.render("cards/home.ejs");
})

// index route 
router.get("/cards",async(req,res)=>{
    let allCard = await Card.find({});
   res.render("cards/index.ejs",{allCard});
})

// add to bag route 
router.post("/add-to-bag",isLogedin,async(req,res)=>{
  try{
    let {productId} = req.body;
    let curentUser = req.user._id;
    let PushItem = await User.findByIdAndUpdate(curentUser,{$push:{item:productId}}, {new:true}); "new = true llikhna important hai nhi to product add hoga but vo dikhega nhi "
    req.flash("success", "product Added Sucsessfull");
    res.redirect("/cards");
  }
  catch(err){
    req.flash("error", "you are not login ");
    res.redirect("/cards");
  }

})
// show route

router.get("/show/:id", async(req,res)=>{
    try{
        let {id} = req.params;
    let card = await Card.findById(id);
    let cards = await Card.find({title:card.title});
      res.render("cards/show.ejs", {card, cards});
    }
    catch(err){
        req.flash("error", err.message);
        res.redirect("/cards")
    }
    
})

// show route in bag 

router.get("/bags",async(req,res,next)=>{
   try{
    let currUser = req.user._id;
    let user = await User.findById(currUser).populate("item");

   res.render("cards/bags.ejs",{itemUser:user.item});
   }
   catch(err){
    req.flash("error", "you must be loged in / signUp " , err.message);
    res.redirect("/cards");
   }
   
});

router.delete("/bags/:id",async(req,res)=>{
    let currUser = req.user._id
    let {id} = req.params;
    let user = await User.findById(currUser).populate("item");
    user.item = user.item.filter(item => item._id.toString() !== id);
   await user.save();
    res.redirect("/bags")
})


const mongoose = require("mongoose");

router.get("/place-order", isLogedin, async (req, res) => {
  try {
    const today = new Date();
    today.setDate(today.getDate() + 4); 
    const futureDate = today.toLocaleDateString("en-GB");

    let id = req.query.order;
    const userId = req.user._id;

    // Use safe ObjectId conversion
    const itemIds = Array.isArray(id)
      ? id.map(i => mongoose.Types.ObjectId.createFromHexString(i))
      : [mongoose.Types.ObjectId.createFromHexString(id)];

    // Pull item(s) from array
    await User.findByIdAndUpdate(userId, {
      $pull: { item: { $in: itemIds } }
    }, { new: true });

    if (!req.user.address) {
      res.render("cards/place.ejs");
    } else {
      res.render("cards/sucsess.ejs", {futureDate});
    }
  } catch (err) {
    console.error("🔥 Error:", err);
    req.flash("error", err.message);
    res.redirect("/bags");
  }
});



router.post("/place-order",isLogedin ,async(req,res,next)=>{
   try{
    let user = req.user._id;
    let {name, area, number, pincode, state ,district} = req.body;
    let adress = await new Cart({
        user:req.user._id,
        name:name,
        area: area,
        number: number,
        pincode:pincode,
        state:state,
        district:district
    });

    adress.save();
    req.flash("success", "adress saved");
    const updatedUser = await User.findByIdAndUpdate(
        user,
        { address: adress._id },
        { new: true }
    );
     res.redirect("/place-order");
}   catch(err){
  console.log(err)
    req.flash("error",err.message)
     return res.redirect("/cards")
   }
});

router.get("/cards/Search",async (req,res)=>{
    const query = req.query?.title;
    const cards = await Card.find({title:{ $regex: query, $options: "i" }});
    if(cards.length === 0){
        req.flash("error", "Item was not found");
        res.redirect("/cards");
    }
    res.render("cards/search.ejs", {cards});
});

router.get("/new",isLogedin,(req,res)=>{
  res.render("cards/new.ejs");
})

router.post("/cards",upload.single("image"), isLogedin , async(req, res)=>{
  try{
    let { title, description, price , shop }= req.body;
  let imglink = req.file.path;

  await cardSchema.validate({title,shop,  description, price, imglink});
  let card =  new Card({
    image:imglink, 
    title: title,
    shop:shop,
    description: description,
    price:price,
    user:req.user._id
  })

  await card.save();
  req.flash("success", "item added 🙂")
  res.redirect("/cards")
  }
  catch(err){
    console.log(err);
    req.flash("error", err.message || "Something went wrong!"); //  Yeh error ko properly dikhaayega
    res.redirect("/new");
  }
})




router.delete("/show/delete/:id",async(req,res)=>{
  try{
    let {id} = req.params;
  const card = await Card.findById(id);


  if (!card) {
    req.flash("error", "Card not found");
    return res.redirect("/cards");
  }

  
 await  Card.findByIdAndDelete(id);
 req.flash("success", "item deleted successfully");
 res.redirect(`/cards`)
  }
  catch(err){
        req.flash(err.message);
        res.redirect(`/cards`)
  }
})




module.exports= router;
