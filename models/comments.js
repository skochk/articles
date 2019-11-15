const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = Schema({ 
    text: String,
    reffersToID: String,
    userID: String,
    articleID: String,
    

  }); 

// there write methods
const comments = mongoose.model('comment', commentSchema);
module.exports = comments;