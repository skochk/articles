const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = Schema({ 
    text: String,
    reffersToID: String, //reffers to id comment first lvl
    userID: String,
    articleID: String,
    date: {type: Date, default: Date.now},
    answersAnswers:[{type: Schema.Types.ObjectId, ref:'commentslvl2'}],
  }); 
  
// there write methods
const comments = mongoose.model('commentslvl2', commentSchema);
module.exports = comments;