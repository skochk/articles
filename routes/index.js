var express = require('express');
var router = express.Router();
var http = require('http');
const cookieParser = require('cookie-parser');


var mongoose = require('mongoose');

const articleModel = require('../models/articles.js');
const commentModel = require('../models/comments.js');
const likesModel = require('../models/likes.js');
const UsersModel = require('../models/loginData.js');


const mainController = require('../controllers/controllersApi');
const Ajv = require('ajv');
const ajv = new Ajv();
const userSchema = require('../schemas/mainSchema');



/* GET home page. */
router.get('/', function(req, res, next) {
  articleModel.find({isPublished:true}) /* */
  .then(data=>{
    res.render('index', {publishedTitles: data});
  })
  .catch((err) => {if(err) throw err});
});


router.post('/register', (req, res) => {
  (async function () {
    const validate = ajv.compile(userSchema);
    const valid = validate(req.body);
    if(!valid){
      const { errors } = validate;
      res.send('invalid data');
    }
    else{
      (async function(){
      let newCokie = await mainController.register(req.body.login, req.body.pwd);
      res.cookie('userID', newCokie); 
      res.redirect('/userpanel');

      //add cookies to get access on /userpanel
      // await UsersModel.findOne({login:req.body.login})
      // .then((data)=>{
      //   // console.log(data);
      //   res.cookie('userID', data._id); 
      //   res.redirect('/userpanel');
      // })
      // .catch((err)=>{if (err) throw err});
      
    })();
    }
  }());
});


router.post('/apiAddComment', function(req,res){
  // console.log(req.body);

  const newComment = new commentModel({
    text: req.body.text,
    articleID: req.body.articleID,
    userID: req.cookies.userID,
  })
  newComment.save();
}); 

router.get('/apiGetComments', function(req,res){
  let str = req.headers.referer;
  let articleID = str.split('http://localhost:3000/articles/')[1];

  // console.log();
  commentModel.find({articleID:articleID})
  .then((data)=>{
    // console.log(data);
    res.send(data);
  })
  .catch(err=>{if(err) throw err}); 
});

router.post('/login', (req, res) => {
  const CurrentUser = {
    login: req.body.login,
    password: req.body.pwd,
  };

  UsersModel.findOne({ login: CurrentUser.login })
    .then((data) => {
      if (data.comparepwd(req.body.pwd)) {
        if(data.isAdmin == true){
          console.log(data._id);
          res.cookie('userID', data._id);
          res.redirect('/adminpanel');
        } else {
          console.log(data._id);
          res.cookie('userID', data._id);
          res.redirect('/userpanel');
        }
      }else{
        res.send('wrong data');
      }
    })
    .catch((err) => { if (err) throw err; });
});



router.get('/adminpanel', function(req,res){
  UsersModel.findOne({isAdmin:true})
  .then((data1)=>{
    // console.log('current cookies: '+ req.cookies.userID);
    // console.log(data1);

    if(data1.id == req.cookies.userID){
      articleModel.find({isPublished:false}) /* */
      .then(data=>{
        // console.log(data);
        res.render('adminIndex', {articles: data});
      })
      .catch(err=>{if(err) throw err});
    }
    else{
      res.send("sorry, you have not permission(cookies)");
    }

  })
  .catch((err)=>{if(err) throw err});

});


router.get("/userpanel", function(req,res){
  if(req.cookies.userID == null){
    res.send("you have to register firstly");
  }
  else{
    res.render('userIndex.jade');
  }
});

router.post('/userAddArticle', function(req,res){
  const newArticles = new articleModel({
    title: req.body.title,
    posterID: req.cookies.userID,
  });
  newArticles.save();
  res.redirect('/userpanel');
})


router.post('/apiPublishArticle', function(req,res){
  console.log(req.body.title);
  articleModel.findOneAndUpdate({title:req.body.title},{isPublished:true})
  .catch((err)=>{if(err) throw err});
})

router.post('/apiAddLike', function(req,res){
  const newLike = new likesModel({
    articleID:req.body.articleID,
    userID:req.body.userID,
  });
  console.log(req.body.userID);
  
  console.log(req.body.articleID);
  newLike.save();
});

module.exports = router;



