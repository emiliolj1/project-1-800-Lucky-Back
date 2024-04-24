const {model, Schema} = require('mongoose');
const userSchema = new Schema({
  Name: {type: String, require: true, minlength: 5, maxlength: 30},
  Email: {type: String, unique: true, require: true, minlength: 5, maxlength:30},
  Password:{type: String, require: true, minlength: 5},
  Role:{type: String, enum:['client', 'admin'], default:'client'},
  Refreshtoken: String,
});
const User = model('User', userSchema);
module.exports = { User };