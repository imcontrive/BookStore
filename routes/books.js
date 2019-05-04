var express = require('express');
var router = express.Router();
var Book = require('../models/Book');
var Author = require('../models/Author');


/* GET users listing. */
router.get('/', function(req, res, next) {
  Book.find({}, (err, books) => {
    // console.log(book, 'this is book in / route');
    if(err) return next(err);
    res.render('book', {books: books});
  })
});
router.post('/', (req, res, next) => {
  console.log(req.body, 'this is body');
  Book.create(req.body, (err, book) => {
    if(err) return next(err);
    res.redirect('/');
  });
})
 
// Auhtors
// router.get('/authors', function(req, res, next) {
//   Author.find({}, (err, authors) => {
//     // console.log(book, 'this is book in / route');
//     if(err) return next(err);
//     res.render('author', {authors: authors});
//   })
// });

// router.post('/authors', (req, res, next) => {
//   console.log(req.body, 'this is body');
//   Author.create(req.body, (err, author) => {
//     if(err) return next(err);
//     res.redirect('/');
//   });
// })



module.exports = router;
