var http = require("http");
var fs = require("fs");
var express = require('express');
var app = express();
var friend = require('./app/data/friends.js');
var path = require("path");

var PORT = process.env.PORT || 8080;



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))
  
app.get("/", function(req, res) {
    res.sendFile(__dirname+ "/public/home.html");
  });
  
  app.get("/survey", function(req, res) {
    res.sendFile(__dirname+ "/public/survey.html");
  });
  
  app.get("/survey1", function(req, res) {
    res.sendFile(__dirname+ "/public/survey1.html");
  });
  app.get("/survey2", function(req, res) {
    res.sendFile(__dirname+ "/public/survey2.html");
  });
  app.get("/survey3", function(req, res) {
    res.sendFile(__dirname+ "/public/survey3.html");
  });
  //save for later when displaying friend
  app.get("/survey33", function(req, res) {
    return res.json(friend);
  });

  app.post("/survey000", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    let pics = req.body;

    friend.friend.push({
      "name": pics.userNameInput,
      "photo": "",
      "scores": [pics.genderValInput, pics.ageGroupInput,
          
      ]
  })
    
  console.log(friend.friend)
    
  });
  // post question scores 1-8
  app.post("/survey111", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    let score = req.body.score;
    


    friend.friend[friend.friend.length-1].scores.push(
     
     score


  )
    
  console.log(friend.friend[friend.friend.length-1])
    
  });
  

  app.post("/survey333", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var pic = req.body.pic;
//  console.log(friend.friend)
  
  console.log(pic)
    friend.friend[friend.friend.length-1].photo=pic
      
      console.log(friend.friend[friend.friend.length-1])
     
      

    
 
    
  });

 
  
  

// console.log(friend.friend[0])

  
  
  
  app.listen(PORT, function(){
      console.log("listening on "+PORT);
  });

  