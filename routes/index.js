var express = require('express');
var router = express.Router();




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// BookForm 

// authorform
router.get('/authors/new', (req, res)=> {
  res.render('authorForm');
});

router.post('/', (req,res,next) => {
  Book.create(req.body, (err,books)=>{
    console.log(err,books);
    res.redirect('/');
    if(err) return next(err);
  })
})

module.exports = router; 
