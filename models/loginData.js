const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const saltRounds = 10;
const loginDataSchema = Schema({
  login: String,
  password: String,
  isAdmin: {type: Boolean, default: false},
});

loginDataSchema.methods.comparepwd = async function (a) {
//   console.log(` this password value hashed: ${this.password} type: ${typeof this.password}`);
  const b = await bcrypt.compare(a, this.password);
//   console.log(b);
  return b;
};

loginDataSchema.methods.hashingpwd = async function (value) {
  const a = await bcrypt.hash(value, saltRounds);
  // consoley.log("before: " + this.password + " after: a");
  return a;

};
const Users = mongoose.model('userData', loginDataSchema);
module.exports = Users;
