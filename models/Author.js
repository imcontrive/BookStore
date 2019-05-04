var mongoose = require('mongoose');
var authorsSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    unique: true,
    minLength: 5
  },
  email:{
    type: String,
    required: [true, "email is required"],
  },
  age:{
    type: Number,
    default: 0
  },
})

module.exports = mongoose.model('Author', authorsSchema);