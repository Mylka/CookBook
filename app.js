var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    flash         = require("connect-flash"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    User          = require("./models/user"),
    seedDB        = require("./seeds"),
    methodOverride = require("method-override")
    
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes       = require("./routes/index")
    


mongoose.connect("mongodb://localhost/yelp_camp_v12");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


// seedDB(); //seed database

// Campground.create(
//     {
//         name:"Granite Hill",
//         image: "https://farm2.staticflickr.com/1835/28143945377_979496bb1a.jpg",
//         description: "this is a huge granite hill, no bathrooms, no water"    
// }, function(err, campground){
//     if(err){
//         console.log(err)
//     } else{
//         console.log("newly created campground");
//         console.log(campground)
//     }
// })



//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret:"noideawhatamdoin",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
   next();

});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("the yelpCamp Server Has Started!!!");
})