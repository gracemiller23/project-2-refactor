var path = require("path");
var db = require("../models");
var express = require("express");
var sequelize = require("sequelize");
var passport = require("../config/passport");

var isAuthenticated = require("../config/middleware/isAuthenticated");

var eventAttendingController = require("../controllers/event-attending");

module.exports = function (app) {

    //////////-----------Attend Event Subscriptions
    app.post("/api/eventsattending/:id", isAuthenticated, eventAttendingController.attendEvent);

    //delete attending because user isn't attending
    app.delete("/api/eventsattending/:id", isAuthenticated, eventAttendingController.dontAttendEvent);

//end module.exports
}