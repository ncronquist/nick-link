// Requires
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var db = require('../models');
var Hashids = require("hashids");

// GLOBAL hashids with salt
hashids = new Hashids("this is my salt");

var router = express.Router();

// Tell node to use bodyParser
router.use(bodyParser.urlencoded({extended: false}));


router.post('/', function(req,res) {
  db.link.findOrCreate({where: {url: req.body.url}, defaults:{clicked: 0} }).spread(function(foundLink, created) {

    var hash = hashids.encode(foundLink.get().id);
    res.redirect('/link/'+hash)
  })
})

router.get('/404', function(req,res) {
  res.render("link/404");
})

router.get('/:hashedId', function(req,res) {
  var id = parseInt(hashids.decode(req.params.hashedId));

  db.link.find({ where: {id: id} }).then(function(data) {
    var shortUrl = req.headers.host + '/' + req.params.hashedId;
    // res.send("Rhh: " + req.headers.host + ' Rphid: ' + req.params.hashedId);
    res.render("link/index", {url: data.get().url, hashurl: shortUrl});
  })
})

module.exports = router;
