
const express = require("express");


const override = require("method-override");
let app = express();
let path = require("path");
const router = require("./routes/cards")
const userRouter = require("./routes/user.js");

const passport = require("passport");
const passportLocal = require("passport-local")
const User = require("./model/user");
// mongoose 

const expressError = require("./error/exError.js");
const wrapAsyncError = require("./error/wrapAsync.js");
const mongoose = require("mongoose");
const dbUrl = process.env.MONGODB_URL;
// const MONGO_URL = "mongodb://127.0.0.1:27017/Ecomerce";
main().then(()=>{
    console.log("connection successfull")
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(dbUrl);
}

app.use(override('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const Card = require("./model/cardSchema");
const Cart = require("./model/bagSchema");

app.set("views engine", "views")
app.set("views" ,  path.join(__dirname,"views") );

app.use(express.static(path.join(__dirname,"/public")))

// ejs mate require for templating
const ejsmate = require("ejs-mate");
app.engine("ejs", ejsmate);

const flash = require("connect-flash");

const cookie = require("cookies");
const cookieParser = require("cookie-parser");
const Session = require("express-session");
const user = require("./model/user");

const MongoStore = require("connect-mongo");

let store =  MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
          secret:process.env.SECRET
    },
    touchAfter:24*3600,
})



const SessionOption= {
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie: {
    maxAge:  7 * 24 * 60 *60 * 1000,
  },
  httpOnly:true ,
};

app.use(Session(SessionOption));
app.use(flash());

app.use(cookieParser());



app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));  
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next)=>{
    res.locals.success = req.flash("success");
    res.locals.error  = req.flash("error");
    res.locals.currUser = req.user;
    res.locals.id = req.query.order
    next()
});

app.use("/", router)
app.use("/", userRouter)


// eror handling

app.all("*", (req,res, next)=>{
    next(new expressError(404, "page not found"));
})

app.use((err, req, res, next)=>{
    let {status = 404, message = "something went wrong"}  = err;
    res.status(status).render("error.ejs", {err});
})


app.listen(3000, ()=>{
    console.log("port is running");
})
