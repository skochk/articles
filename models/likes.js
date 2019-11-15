const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const likeSchema = Schema({ 
    articleID: String,
    userID: String,
  }); 

// there write methods
const likes = mongoose.model('like', likeSchema);
module.exports = likes;