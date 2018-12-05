var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

router.get("/campgrounds", function(req, res){
    //Get al campground form DB
    Campground.find({}, function(err,allcampgrounds){
        if(err){ 
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds:allcampgrounds, currentUser: req.user})
        }
        
    })
        
    //res.render("campgrounds", {campgrounds: campgrounds});
})
//create - add new campground to DB
router.post('/campgrounds', middleware.isLoggedIn, function(req,res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name:name, price: price, image:image, description:desc, author: author}
    
    //Create a new campground and save to DB
    
   Campground.create(newCampground,function(err, newlyCreated) {
       if(err){
           console.log(err)
       } else{
        //redirect back to campgrounds
        res.redirect('/campgrounds')
       }
   })
});

router.get("/campgrounds/new", middleware.isLoggedIn,function(req, res) {
    res.render("campgrounds/new.ejs");
})

// SHOW - shows more infor about one campground
router.get("/campgrounds/:id", function(req,res){
     //find the campground with provided id and 
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err)
        } else{
             //render show template with provided id
    res.render("campgrounds/show", {campground: foundCampground}); 
        }
    })
})

//EDIT Campground route
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership, function(req,res){
        Campground.findById(req.params.id, function(err, foundCampground){
                 res.render("campgrounds/edit", {campground: foundCampground});
     });
});


//UPDATE CAMPGROUND route
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
    //find and update the correct campground
    //redirect somewhere 
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

//DESTROY campground Route
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    })
})




module.exports = router;