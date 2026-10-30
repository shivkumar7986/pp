const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({
    username: String,
    password: String,
    lastlogin: Date,
  });

const loginModel = mongoose.model("loginData", loginSchema);
module.exports= loginModel