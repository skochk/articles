const mongoose = require('mongoose');

const { Schema } = mongoose;

const loginDataSchema = Schema({
    login: String,
    password: String,
  });
  
const Users = mongoose.model('userData', loginDataSchema);
module.exports = Users;