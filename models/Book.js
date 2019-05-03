var mongoose = require('mongoose');
var bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    unique: true,
    minLength: 5
  },
  description: String,
  tags: [String],
  pages:{
    type: Number,
    default: 0
  },
  timestamps:true
})

module.export = mongoose.model('Book',bookSchema);