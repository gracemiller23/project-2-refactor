var path = require("path");
var db = require("../models");
var sequelize = require("sequelize");
var moment = require("moment");


//user marked attending for an event 
exports.attendEvent = function(req, res){
        
        db.User.findById(req.user.userId).then(function(assignedUser){
            console.log("user object? :" + assignedUser);
            //through may need to be the name of the through table instead
            //creates an association for the attending join table
            assignedUser.addEvent_ID(req.params.id).then(function(data){
                res.json(data);
            });
        }).catch(function(error){
        console.log(error)
    });

}

//user association deleted because user isn't attending 
exports.dontAttendEvent = function(req, res){
    console.log("in event attending routes, event id: " + req.params.id + " userid: " + req.user.userId);
    
    db.User.findById(req.user.userId).then(function(assignedUser){
        console.log("event object? :" + assignedUser);
        assignedUser.removeEvent_ID(req.params.id).then(function(data){
            res.json(data);
        });
    }).catch(function(error){
        console.log(error);

  });

}

