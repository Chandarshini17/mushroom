const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
  s_no: String,
  planned: String,
  unplanned: String,
  stock: String,
  total: String,
});

const Dashboard = mongoose.model('Dashboard', dashboardSchema);

module.exports = Dashboard;