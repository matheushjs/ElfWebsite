var express = require("express");
var router = new express.Router();
var dbUsers = require("../model/db_users");

const PAGE_AUTH = {
  "/": ["walwal20"],
  "/all_users": ["walwal20"],
};

// Middleware for always checking if the user is authorized to access such page
router.use(async (req, res, next) => {
  // req.url is the path relative to secret/; e.g. '/all_users' or '/really_secret/page1'
  var users = PAGE_AUTH[req.url];

  if(users && users.indexOf(req.session.username) >= 0){
    return next();
  } else {
    req.renderer.messagePage(res, "Sorry, there is nothing special for you yet.");
  }
});

// Middleware for providing the requested page
router.use(async (req, res) => {
  req.renderer.messagePage(res, "Sorry, we are currently building the secret section.");
});

module.exports = router;