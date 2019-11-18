var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const articleModel = require('../models/articles.js');
const commentModel = require('../models/comments.js');

/* GET users listing. */


      router.get('/:id', (async function(req,res){
        let content = await articleModel.findOne({_id:req.params.id});
        let comments = await commentModel.find({articleID:req.params.id});
        // console.log(req.params.id);
        // console.log(comments);
        res.render('title', {content:content, comments: comments});


        
    }));
    
module.exports = router;
    