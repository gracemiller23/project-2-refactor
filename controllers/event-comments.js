var path = require("path");
var db = require("../models");
var sequelize = require("sequelize");
var moment = require("moment");

//creates a new comment on an event
exports.newComment = function(req, res){
    let newComment = req.body;
    newComment.userCreator = req.user.userId;

    db.EventComments.create(newComment).then(function(dbEventComment){
        console.log("Post - dbEventComment:" + dbEventComment);
        console.log("Post - paramsID:" + req.params.id);           

        //associates the comment with the correct event
        db.CalEvent.findById(req.params.id).then(function(assignedEvent){
            console.log("event object? :" + assignedEvent);
            assignedEvent.addEventComment_ID(dbEventComment);
            
            //associates the comment with the user
            db.User.findById(req.user.userId).then(function(assignedUser){
                console.log("event object? :" + assignedUser);
                assignedUser.addEventComment_ID(dbEventComment);

                res.json(dbEventComment);
            });
          
        });
        
        
    }).catch(function(error){
            console.log(error);

      });
}

//update an event comment
exports.updateEventComment = function(req, res){
    db.EventComments.update(
        req.body,
        {
            where: {
                id: req.params.id
            }
    }).then(function(dbCalEvent){
        res.json(dbCalEvent)
     
    }).catch(function(error){
        console.log(error)
    });
}

//deletes an event comment 
exports.deleteEventComment = function(req, res){
        
    db.EventComments.destroy({
        where: {
        id: req.params.id
        }
    }).then(function(dbCalEvent){
        res.json(dbCalEvent)
    });
    

}