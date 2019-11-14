var express = require('express');
var router = express.Router();
const commentModel = require('../models/comments.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// router.post('/apiAddComment', function(req,res){
//   console.log(req.body);
// });
module.exports = router;
