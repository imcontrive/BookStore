var express = require('express');
var router = express.Router();
var Author = require('../models/Author');

 
// Auhtors
router.get('/', function(req, res, next) {
  Author.find({}, (err, authors) => {
    // console.log(book, 'this is book in / route');
    if(err) return next(err);
    res.render('author', {authors: authors});
  })
});

router.post('/', (req, res, next) => {
  console.log(req.body, 'this is body');

  Author.create(req.body, (err, author) => {
    if(err) return next(err);
    res.redirect('/authors');
    
  });
})

router.get('/:id', (req, res) => {
  var id = req.params.id;
  Author.findById(id, (err, author) => {
    if(err) return next(err);
    res.render('singleAuthor', {author: author});
  })
})



module.exports = router;
