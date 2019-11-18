const UsersModel = require('../models/users.js');

const jwt = require('jsonwebtoken');


module.exports = {
    login: function(login,password){},
    register: async function(login,password){
        const newUser = new UsersModel({
            login:login,
            password:password,
            
          });
          const a  = await newUser.save();
          return a;
          
    }
}