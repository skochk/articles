var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const articleModel = require('../models/articles.js');


/* GET users listing. */


      router.get('/:id', function(req,res){
        articleModel.findOne({_id:req.params.id})
        .then((data)=>{
            res.render('title', {content: data});

        })
        .catch((err)=>{
            if(err) throw err;
        });
    });
    
module.exports = router;
    