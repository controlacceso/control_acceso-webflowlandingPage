var express = require('express');
var router = express.Router();
var md5 = require('blueimp-md5');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home'});
});//.router.get('/', function(req, res, next)

module.exports = router;
