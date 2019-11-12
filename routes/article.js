var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const articleModel = require('../models/articles.js');


/* GET users listing. */

articleModel.find({isPublished:true}, function(req, data){
    console.log(data.length);
    // console.log(data[0]);
    for(let num = 0; num< data.length; num++){
      router.get(`/${data[num].id}`, function(req,res){
        res.render("title: " + data.title);
      });
    }
  
  });

module.exports = router;
