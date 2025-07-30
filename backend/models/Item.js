// const mongoose = require('mongoose');

// const itemSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   price: Number,
//   image: String,
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
// });

// module.exports = mongoose.model('Item', itemSchema);


// models/Item.js
const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
module.exports = mongoose.model('Item', itemSchema);