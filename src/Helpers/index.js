

String.prototype.capitalize = function () {
  const splitStr = this.toLowerCase().split(' ');

  const capitalizedStrings = splitStr.map(word => word.charAt(0).toUpperCase() + word.substr(1));
  return capitalizedStrings.join(' ');
};


String.prototype.removeSpecialCharacters = function () {
  return this.replace(/[^\w\s]/gi, '');
};


export function cleanUpJSON(books) {
  return books.map((book, i) => {
    const newBook = { ...book };
    newBook.title = book.title.removeSpecialCharacters().capitalize();
    newBook.author = book.author.removeSpecialCharacters().capitalize();
    return newBook;
  });
}
