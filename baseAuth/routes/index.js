var express = require('express');
var router = express.Router();
const UsersModel = require('../models/users');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const auth = require('../controllers/auth.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.cookies['jwt-token']){
    
  }else{
    res.redirect('/auth');
  }
});

router.get('/auth', function(req,res){
  res.render('auth');
})

router.post('/apiRegister', async function(req,res){

  const a = await auth.register(req.body.login,req.body.pwd);
  jwt.sign({id:a_id});
  console.log(a);

});

module.exports = router;
