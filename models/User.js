var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 9
  },
},{timesstamps:true},)

userSchema.pre('save', function(next){
  var salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
})

userSchema.methods.validatePassword= function(password){
  return bcrypt.compareSync(password,this.password);
}


module.exports = mongoose.model('User', userSchema);
