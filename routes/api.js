var express = require('express');
var router = express.Router();
const articleModel = require('../models/articles.js');
const commentModel = require('../models/comments.js');
const likesModel = require('../models/likes.js');
const UsersModel = require('../models/loginData.js');
// const {login, pwd, text, articleID, title, userID} = req.body;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/answerOnComment', function(req,res){
  console.log(req.body);
  console.log(req.cookies.userID);
  // console.log(req.params.id);
  let str = req.headers.referer;
  let articleID = str.split('http://localhost:3000/articles/')[1];
  console.log(articleID);
  const newComment = new commentModel({
    text: req.body.text,
    reffersToID: req.body.id,
    userID: req.cookies.userID,
    articleID: articleID,
  });
  newComment.save();
})

module.exports = router;
