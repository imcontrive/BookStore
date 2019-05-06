var mongoose = require('mongoose');
var bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    unique: true,
    minLength: 5
  },
  author: {type: mongoose.Schema.Types.ObjectId,  ref: "Author"},
  description: String,
  tags: [String],
  pages:{
    type: Number,
    default: 0
  },
})

module.exports = mongoose.model('Book', bookSchema);