const {model, Schema} = require('mongoose');
const RestaurantSchema = new Schema({
  Title: {type: String, require: true, minlength:5, maxlength:50},
  Information1: {type: String, require: true, minlength: 5, maxlength: 500},
  Information2: {type: String, require: true, minlength: 5, maxlength: 1000},
  Menu: {type: String, require: true},
  Bookings:  [{
    name: {type: String},
    email: { type: String},
    date: { type: String }
  }]
});
const Restaurant = model('Restaurant', RestaurantSchema);
module.exports = {Restaurant};