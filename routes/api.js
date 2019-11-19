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
  // console.log(req.body);

  let newComment2lvl_ID;
  newComment2lvl.save()
    .then((data)=>{
      newComment2lvl_ID = newComment2lvl._id;
      // console.log("id of new comment2lvl: " + newComment2lvl_ID);
      //getting access on main comments
      //adding record to 'answers'
      commentModel.findByIdAndUpdate(req.body.commentID, {$push: {answers:newComment2lvl_ID}})
      .then((data)=>{
        // console.log(data);
        // console.log('post id of lvl1 comm: ' + req.body.commentID);
        
      })


    });

})
module.exports = router;
