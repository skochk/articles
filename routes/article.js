var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const articleModel = require('../models/articles.js');
const commentModel = require('../models/comments.js');
const commentLvl2Model = require('../models/commentslvl2.js');

/* GET users listing. */


      router.get('/:id', (async function(req,res){
        let content = await articleModel.findOne({_id:req.params.id});
        let comments = await commentModel.find({articleID:req.params.id})
        .populate({
            path:'answers',
            populate: {
                path:'answersAnswers'
            }
        })
            .then((data)=>{
                res.render('title', {content:content, comments: data});
                // res.send(data);
        })
        .catch((err)=>{if(err) throw err});
        


    }));
    
    
module.exports = router;
    