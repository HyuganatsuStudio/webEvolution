var express = require('express');
var router = express.Router();

/* GET  js. */
router.get('/js/vue.js', function(req, res, next) {
  res.sendfile("UserInterface/js/vue.js");
});

router.get('/js/app.js', function(req, res, next) {
  res.sendfile("UserInterface/js/app.js");
});
/* GET  css. */
router.get('/css/styles.css', function(req, res, next) {
  res.sendfile("UserInterface/css/styles.css");
});

/* GET SVGGraph listing. */
router.get('/SVGGraph/SVGGraph.html', function(req, res, next) {
  res.sendfile("UserInterface/SVGGraph/SVGGraph.html");
});

/* GET SVGGraph listing. */
router.get('/SVGGraph/SVGGraph.css', function(req, res, next) {
  res.sendfile("UserInterface/SVGGraph/SVGGraph.css");
});

/* GET SVGGraph listing. */
router.get('/SVGGraph/SVGGraph.js', function(req, res, next) {
  res.sendfile("UserInterface/SVGGraph/SVGGraph.js");
});

/* GET GridComponent listing. */
router.get('/GridComponent/GridComponent.html', function(req, res, next) {
  res.sendfile("UserInterface/GridComponent/GridComponent.html");
});
module.exports = router;
