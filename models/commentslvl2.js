const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = Schema({ 
    text: String,
    reffersToID: {type: 'String', default: null}, //reffers to id comment first lvl
    userID: String,
    articleID: String,
    date: {type: Date, default: Date.now},
    
  }); 
  
// there write methods
const comments = mongoose.model('commentslvl2', commentSchema);
module.exports = comments;