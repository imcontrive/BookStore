var express = require('express');
var router = express.Router();
var Author = require('../models/Author');
// var Book = require('../models/Book');


 
// Authors
router.get('/', function(req, res, next) {
  Author.find({}, (err, authors) => {
    if(err) return next(err);
    console.log(authors,"...............test authors...............")
    res.render('author', {authors: authors});
  })
});

// authorform
router.get('/new', (req, res)=> {
  res.render('authorForm');
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
  Author.findById(id).populate('books').exec((err, author) => {
    if(err) return next(err);
    console.log(author, '........................THis is IT..........................')
    res.render('singleAuthor', {author: author});
  })
})
// /authors/<%= author._id%>/edit
// update Author
var id;
router.get('/:id/edit', (req, res) => {
  id = req.params.id;
  Author.findById(id, (err, author) => {
    if(err) return next(err);
    res.render('updateAuthor', {author: author});
  })
})



router.post('/:id', (req, res) => {
  id = req.params.id;
  // console.log(id,"test id");
  Author.findByIdAndUpdate(id, req.body, (err, author) => {
    if(err) return next(err);
    res.redirect('/authors');
  })
})

// delete
router.get('/:id/delete', (req, res) => {
  id = req.params.id;
  Author.findByIdAndDelete(id, req.body,(err, author) => {
    if(err) return next(err);
    res.redirect('/authors');    
  })
})




module.exports = router;
