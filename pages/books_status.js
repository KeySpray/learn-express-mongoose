let BookInstance = require('../models/bookinstance');

getBooks = async () => {
  return BookInstance.find({'status': {$eq: 'Available'}})
    .populate('book')
    .exec()
    .then(list_bookinstances => {
      return list_bookinstances.map(instance => ({
        title: instance.book.title, 
        status: instance.status
      }));
    })
    .catch(err => {
      console.error('Error fetching available book instances:', err);
      throw err; 
    });
}

exports.show_all_books_status = function(req, res) {
  var books = getBooks();
  return res.send(books);
}