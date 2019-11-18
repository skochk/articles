const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = Schema({ 
    text: String,
    reffersToID: {type: 'String', default: null}, //reffers to id comment
    userID: String,
    articleID: String,
    

  }); 
  
// there write methods
const comments = mongoose.model('comment', commentSchema);
module.exports = comments;