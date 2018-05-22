var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'hyuganatsu Studio' });
  res.sendfile("UserInterface/index.html");
});
/* GET  js. */
router.get('/js/vue.js', function(req, res, next) {
  res.sendfile("UserInterface/js/vue.js");
});
/* GET  js. */
router.get('/js/app.js', function(req, res, next) {
  res.sendfile("UserInterface/js/app.js");
});
/* GET  css. */
router.get('/css/styles.css', function(req, res, next) {
  res.sendfile("UserInterface/css/styles.css");
});
module.exports = router;
