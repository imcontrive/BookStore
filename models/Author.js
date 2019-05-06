var mongoose = require('mongoose');
var authorsSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email:{
    type: String,
    required: [true, "email is required"],
  },
  age:{
    type: Number,
    default: 0
  },
  books:[{type:mongoose.Schema.Types.ObjectId, ref: 'Book'}]
})

module.exports = mongoose.model('Author', authorsSchema);