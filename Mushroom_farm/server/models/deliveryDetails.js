const mongoose = require('mongoose');

const deliveryDetailsSchema = new mongoose.Schema({
  s_no: Number,
  user_name: String,
  person_name: String,
  phn: String,
  deliver_items : String,
});

const DeliveryDetails = mongoose.model('DeliveryDetails', deliveryDetailsSchema);

module.exports = DeliveryDetails;