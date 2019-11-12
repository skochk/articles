const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const articleSchema = Schema({ 
    title: String,
  }); 

// there write methods
const articles = mongoose.model('articles', articleSchema);
module.exports = articles;