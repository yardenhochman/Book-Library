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
  const imagesRequests = books.map((book, i) => axios(`https://www.googleapis.com/books/v1/volumes?q=${book.title.replace(' ', '+')}`));
  const booksResponses = await Promise.all(imagesRequests);
  const booksWithImages = booksResponses.map(({ data: { items } }, i) => {
    items.some(({ volumeInfo: { imageLinks: { thumbnail } = {} } = {} } = {}) => {
      if (thumbnail) return books[i].image = thumbnail;
    });
    return books[i];
  });
  return booksWithImages;
};

export const newBookState = {
  editIndex: false,
  openEditModal: true,
  activeBook: {
    id: Math.floor(Math.random() * 1000000000),
    title: '',
    author: '',
    published_date: '',
  },
};
