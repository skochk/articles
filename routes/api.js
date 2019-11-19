var express = require('express');
var router = express.Router();
const articleModel = require('../models/articles.js');
const commentModel = require('../models/comments.js');
const commentLvl2Model = require('../models/commentslvl2.js');
const likesModel = require('../models/likes.js');
const UsersModel = require('../models/loginData.js');
// const {login, pwd, text, articleID, title, userID} = req.body;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/answerOnComment', function(req,res){
  let str = req.headers.referer;
  let articleID = str.split('http://localhost:3000/articles/')[1];
  const newComment2lvl = new commentLvl2Model({
    text: req.body.text,
    reffersToID: req.body.commentID,
    userID: req.cookies.userID,
    articleID: articleID,
  });

  let newComment2lvl_ID;
  newComment2lvl.save()
    .then((data)=>{
      newComment2lvl_ID = newComment2lvl._id;
      commentModel.findByIdAndUpdate(req.body.commentID, {$push: {answers:newComment2lvl_ID}})
      .then((data)=>{
      })
    });

});


router.post('/answerOnCommentLast', (async function(req,res){
  let str = req.headers.referer;
  let articleID = str.split('http://localhost:3000/articles/')[1];
  const newComment2lvl = new commentLvl2Model({
    text: req.body.text,
    reffersToID: req.body.commentID,
    userID: req.cookies.userID,
    articleID: articleID,
  });

  let lastlvl;
  await newComment2lvl.save()
    .then((data)=>{
      lastlvl = newComment2lvl._id;
    });

  await  commentLvl2Model.findByIdAndUpdate(req.body.commentID, {$push: {answersAnswers:lastlvl}})
      .then((data)=>{
        console.log(data);
      });
}));
module.exports = router;
