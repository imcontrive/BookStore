var express = require('express');
var router = express.Router();
var User = require('../models/User');


router.get('/', function(req, res, next) {
  res.render('user');
});

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   User.find({}, (err, user) => {
//     if(err) return next(err);
//     console.log(user,"...............test user...............")
//     res.render('user', {user: user});
//   })
// });

router.post('/', (req,res,next) => {
  User.create(req.body, (err,user)=>{
    console.log(err,user,"after create");
    res.redirect('/');
    if(err) return next(err);
  })
})

// show users

router.get('/singleUser', (req, res) => {
  User.find({}, (err, user) => {
    if(err) return next(err);
    res.render('singleUser', {user: user});
  })
})

// login 
router.post("/login", (req,res,next) => {
  console.log(req.body);
  var {email,password} = req.body;
  if(!email || !password){
    return res.redirect('/');
  }
  User.findOne({email: email},(err,user) => {
    if(err) return next(err);
    if(!user) return res.status(400).redirect("/");
    console.log(!user.validatePassword(password),"fghjksedcfgvbhnjkdxcfvgbh");
    if(!user.validatePassword(password)) return res.status(400).redirect('/users');
    req.session.userId = user._id;
    res.status(200).redirect('/');
  })
})

module.exports = router;