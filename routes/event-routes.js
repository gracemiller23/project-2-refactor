var path = require("path");
var db = require("../models");
var express = require("express");
var sequelize = require("sequelize");
var passport = require("../config/passport");
var moment = require("moment");

var eventsController= require("../controllers/events");

var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {


  app.get("/event/edit/:id", isAuthenticated, function (req, res) {
    db.CalEvent.findOne({
        where: {
            id: req.params.id
        },
        include: [{model: db.User, as: "User_Id"}, {model: db.User, as: "EventCreator"},{model: db.EventComments, as:"EventComment_ID", include:[{model: db.User, as: "User_Id"}]}]
     }).then(function(dbCalEvent){
        res.renderWithContext("eventedit", dbCalEvent);
     });
    
  });
 

  //allows users to view all events
  app.get("/events", isAuthenticated, eventsController.allEvents);

  //allows users to view a single event
  app.get("/events/:id", isAuthenticated, eventsController.singleEvent);

    // //retrieves one, specified event
    // app.get("/api/events/:id", isAuthenticated, function(req, res){

    //    db.CalEvent.findOne({
    //        where: {
    //            id: req.params.id
    //        },
    //        include: [{model: db.User, as: "User_Id"}, {model: db.User, as: "EventCreator"},{model: db.EventComments, as:"EventComment_ID", include:[{model: db.User, as: "User_Id"}]}]
    //     }).then(function(dbCalEvent){
    //         res.json(dbCalEvent)
    //     });

    // });
 


    //adds a new event to the database
    app.post("/events", isAuthenticated, eventsController.createEvent);

    //updates an event

    app.put("/api/events/:id", isAuthenticated, eventsController.updateEvent);

    //deletes an event
    app.delete("/api/events/:id", isAuthenticated, eventsController.deleteEvent);

     //retrieves events from a specific category
     app.get("/events/sort/:category", isAuthenticated, eventsController.categoryEvents);

      //retrieves events that a user is attending
     app.get("/api/user/events", isAuthenticated, eventsController.userAttendingEvents);

      //retrieves events with a matching zipcode
    //   app.get("/api/events/zip/:zip", isAuthenticated, function(req, res){

    //     db.CalEvent.findOne({
    //         where: {
    //             postalCode: req.params.zip
    //         },
    //         include: [{model: db.User, as: "User_Id"}, {model: db.User, as: "EventCreator"},{model: db.EventComments, as:"EventComment_ID", include:[{model: db.User, as: "User_Id"}]}]
    //      }).then(function(dbCalEvent){
    //          res.send(dbCalEvent)
    //      });
 
    //  });


//end module.exports
};

