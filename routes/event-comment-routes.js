var path = require("path");
var db = require("../models");
var express = require("express");
var sequelize = require("sequelize");
var passport = require("../config/passport");

var isAuthenticated = require("../config/middleware/isAuthenticated");

var eventCommentsController = require("../controllers/event-comments");


//incorporate special join functions!
module.exports = function (app) {

    //retrieves all comments for an event
    // app.get("/api/events/:id/comments", function (req, res) {

    //     db.CalEvent.findById(req.params.id).then(function(dbCalEvent){
    //       dbCalEvent.getEventComment_IDs();
    //     });

    // });

    //adds a new comment to an event 
    app.post("/api/events/:id/comments", isAuthenticated, eventCommentsController.newComment );

    //updates an event comment

    app.put("/api/events/comments/:id", isAuthenticated, eventCommentsController.updateEventComment);

    //deletes an event comment
    app.delete("/api/events/comments/:id", isAuthenticated, eventCommentsController.deleteEventComment);

//end module.exports
}