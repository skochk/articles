var express = require('express');
var router = express.Router();
var http = require('http');

var mongoose = require('mongoose');

const usersModel = require('../models/users.js');
const articleModel = require('../models/articles.js');
const commentModel = require('../models/comments.js');

// app.use(bodyParser.json());


/* GET home page. */
router.get('/', function(req, res, next) {

  articleModel.find({isPublished:true}) /* */
  .then(data=>{
    res.render('index', {publishedTitles: data});
  })
  .catch((err) => {if(err) throw err});
});




router.post('/apiAddComment', function(req,res){
  console.log(req.body);

  const newComment = new commentModel({
    text: req.body.text,
    articleID: req.body.articleID
  })
  newComment.save();
}); 

router.get('/apiGetComments', function(req,res){
  let str = req.headers.referer;
  let articleID = str.split('http://localhost:3000/articles/')[1];

  console.log();
  commentModel.find({articleID:articleID})
  .then((data)=>{
    console.log(data);
    res.send(data);
  })
  .catch(err=>{if(err) throw err}); 
});

router.post('/login', function(req,res, next){
  // const users = new usersModel({
  //   login: req.body.login,
  //   password: req.body.pwd,

  // }); 
  usersModel.findOne({login: req.body.login})
  .then((data)=>{
    if(data.password == req.body.pwd){
      if(data.isAdmin == true){
        res.redirect('/adminpanel');
      }
      else{
        res.redirect('/userpanel')
      }
    }
    else{
      res.send('wrong data');
    }
  })
  .catch((err) => { if (err) throw err; });
  // res.redirect('/gg');
});




router.get('/adminpanel', function(req,res){
  articleModel.find({isPublished:false}) /* */

  .then(data=>{
    // console.log(data);
    res.render('adminIndex', {articles: data});
  })
  .catch(err=>{if(err) throw err});
})



router.get("/userpanel", function(req,res){
  res.render('userIndex.jade');
});

router.post('/userAddArticle', function(req,res){
  const newArticles = new articleModel({
    title: req.body.title,
  });
  newArticles.save();
  res.redirect('/userpanel');
})


router.post('/apiPublishArticle', function(req,res){
  console.log(req.body.title);
  articleModel.findOneAndUpdate({title:req.body.title},{isPublished:true})
  .catch((err)=>{if(err) throw err});
})

      
module.exports = router;
