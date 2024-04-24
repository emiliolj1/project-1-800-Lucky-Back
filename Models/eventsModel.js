const {model, Schema} = require('mongoose');
const EventsSchema = new Schema({
  Title: {type: String, require: true, minlength:5, maxlength:50},
  Information1: {type: String, require: true, minlength: 5, maxlength: 500},
  Img1: {type: String, require: true},
  Img2: {type: String, require: true},
  Img3: {type: String, require: true},
  Img4: {type: String, require: true},
});
const Event = model('Event', EventsSchema);
module.exports = {Event};