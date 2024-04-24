const {model, Schema} = require('mongoose');
const RestaurantSchema = new Schema({
  Title: {type: String, require: true, minlength:5, maxlength:50},
  Information1: {type: String, require: true, minlength: 5, maxlength: 500},
  Information2: {type: String, require: true, minlength: 5, maxlength: 1000},
  Img1: {type: String, require: true},
  Img2: {type: String, require: true},
  Img3: {type: String, require: true},
  Img4: {type: String, require: true},
  Menu: {type: String, require: true},
  Bookings:  [{
    name: {type: String},
    email: { type: String},
    date: { type: String }
  }]
});
const Restaurant = model('Restaurant', RestaurantSchema);
module.exports = {Restaurant};