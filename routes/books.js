var express = require('express');
var router = express.Router();
var Book = require('../models/Book');
var Author = require('../models/Author');


/* GET users listing. */
router.get('/', function(req, res, next) {
  Book.find({}).populate('author').exec((err, books) => {
    console.log(books,"check book");
    // console.log(book, 'this is book in / route');
    if(err) return next(err);
    console.log(books,"books association")
    res.render('book', {books: books});
  })
});

router.post('/', (req, res, next) => {
  Book.create(req.body, (err, book) => {
    var id = book._id;
    console.log(id, 'This is ID')
    if(err) return next(err);
    Author.findOneAndUpdate(id, {books: id}, (err, author) => {
      console.log(author, 'This is freaking author')
      if(err) return next(err);
      res.redirect('/');
    })
  });
})

router.get('/new', (req, res,next)=> {
  // fetch all authors
  Author.find({}, (err, authors) => {
    if(err) return next(err);
  res.render('bookForm', {authors: authors});

  })
  
});
// update and delete

router.get('/:id', (req, res) => {
  var id = req.params.id;
  Book.findById(id, (err, book) => {
    if(err) return next(err);
    res.render('updatebook', {book: book});
  })
})

var id;
router.get('/:id/edit', (req, res) => {
  id = req.params.id;
  Book.findById(id, (err, book) => {
    if(err) return next(err);
    res.render('updatebook', {book: book});
  })
})

router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  // console.log(id,"id ............")
  Book.findByIdAndUpdate(id, req.body, (err, book) => {
    // console.log(req.body, 'this is body');
    if(err) return next(err);
    res.redirect('/books');
  })
})

// delete
router.get('/:id/delete', (req, res) => {
  id = req.params.id;
  Book.findByIdAndDelete(id, req.body,(err, book) => {
    if(err) return next(err);
    res.redirect('/books');    
  })
})





module.exports = router;
