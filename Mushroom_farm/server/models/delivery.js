const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  s_no: Number,
  p_id: String,
  person_name: String,
  phn: Number,
});

const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;
