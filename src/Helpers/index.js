import axios from 'axios';


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

export const collectImages = async (books) => {
  const imagesRequests = books.map(book => axios(`https://www.googleapis.com/books/v1/volumes?q=${book.title.replace(' ', '+')}`));
  const booksResponses = await Promise.all(imagesRequests);
  const booksWithImages = booksResponses.map(({ data: { items } }, i) => {
    items.some(({ volumeInfo: { imageLinks: { thumbnail } = {} } = {} } = {}) => {
      if (thumbnail) {
        books[i].image = thumbnail;
        return true;
      }
    });
    return books[i];
  });
  return booksWithImages;
};

export const collectImage = async (book) => {
  const q = book.title.replace(new RegExp(' ', 'g'), '+');
  const { data: { items } } = await axios(`https://www.googleapis.com/books/v1/volumes?q=${q}`);
  const { volumeInfo: { imageLinks: { thumbnail: image } } } = await items.find(({ volumeInfo: { imageLinks: { thumbnail } = {} } = {} } = {}) => thumbnail);
  book.image = image;
  return book;
};