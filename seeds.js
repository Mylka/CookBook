var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")

var data = [
    {
        name: "Claud's Rest",
        image: "https://images.unsplash.com/photo-1519114056088-b877fe073a5e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=148b001f50f5029d6193578567d18eca&auto=format&fit=crop&w=1190&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
     {
        name: "Desert",
        image: "https://images.unsplash.com/photo-1542627054-304853017c33?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d21b6ee2997adfdac5f51efdc04975c7&auto=format&fit=crop&w=1050&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
     {
        name: "Another Claud",
        image: "https://images.unsplash.com/photo-1542708993627-b6e5bbae43c4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e0fa345a8b4f99db98a317cb2f2aa1ba&auto=format&fit=crop&w=1928&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    ]

function seedDB(){
    //Remove all campgrounds
  Campground.remove({}, function(err){
    if(err){
        console.log(err);
    } else{
     console.log("removed campgrounds!")
     
      data.forEach(function(seed){
      Campground.create(seed, function(err, campground){
          if(err){
              console.log(err)
          } else {
              console.log("created campground");
              // create a comment
              Comment.create(
                  {text: " this place is great, but I wish there was internet",
                  author: "Homer"
                  }, function(err,comment){
                      if(err){
                          console.log(err)
                      } else{
                        campground.comments.push(comment);
                        campground.save();
                        console.log("created new comment")
                      }
                  })
          }
        })
    }) 
    
  }
  //add new campgrounds
  //add a few comments
})
}


module.exports = seedDB;