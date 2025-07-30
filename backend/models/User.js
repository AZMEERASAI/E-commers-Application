// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: {type:String,required:true},
//   email: { type: String, unique: true,required:true },
//   password: { type:String,required:true},
//   role: { type: String, enum: ['admin', 'user'] }
// });

// module.exports = mongoose.model('User', userSchema);



// models/User.js
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['user', 'admin'] },
  cart: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
      quantity: { type: Number, default: 1 }
    }
  ]
});
module.exports = mongoose.model('User', userSchema);