import axios from 'axios';
import React, { Component } from 'react';
import BooksDisplay from './BooksDisplay';
import EditBox from './EditBox';
import { cleanUpJSON } from './Helpers';
import {
  AddBookButton, AppTitle, Body, BooksArea, BooksHeaderImage, EditModal, Heading,
} from './style';

class App extends Component {
  state = {
    books: [],
    openEditModal: false,
    openAddModal: false,
    activeBook: false,
    editIndex: false,
  }

  componentDidMount = () => {
    axios('books.json')
      .then(({ data: books }) => {
        this.setState({ books: cleanUpJSON(books) });
        this.collectImages();
      })
      .catch(err => console.log(err));
  }

  setBookToEdit = (id) => {
    if (id === -1) {
      const newBook = {
        id: Math.floor(Math.random() * 1000000000),
        title: '',
        author: '',
        published_date: '',
      };
      return this.setState(
        {
          editIndex: false,
          openEditModal: true,
          activeBook: { ...newBook },
        },
      );
    }
    const { books } = this.state;
    const indexToEdit = books.findIndex(book => book.id === id);
    const book = { ...books[indexToEdit] };
    this.setState({ editIndex: indexToEdit, openEditModal: true, activeBook: book });
  }

  collectImages = () => {
    const { books } = this.state;
    books.map((book, i) => {
      axios(`https://www.googleapis.com/books/v1/volumes?q=${book.title.replace(' ', '+')}`)
        .then(({ data: { items } }) => {
          items.some((item) => {
            if (item.volumeInfo && item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail) {
              books[i].image = item.volumeInfo.imageLinks.thumbnail;
              this.setState({ books });
              return true;
            }
          });
        });
    });
  }

  removeBook = (id) => {
    const { books } = this.state;
    const indexToRemove = books.findIndex(book => book.id === id);
    books.splice(indexToRemove, 1);
    this.setState({ books });
  }

  edit = (property, value) => {
    const { activeBook } = this.state;
    activeBook[property] = value.capitalize();
    this.setState({ activeBook });
  }

  save = () => {
    const { books, activeBook, editIndex } = this.state;
    if (editIndex) {
      books[editIndex] = { ...activeBook };
    } else {
      if (books.some(book => book.title === activeBook.title)) {
        return this.setState({ error: 'This name already exists!' });
      }
      books.push(activeBook);
    }
    this.setState({ books });
    this.closeEdit();
  }

  closeEdit = () => this.setState({ editIndex: false, openEditModal: false, activeBook: {} });

  render = () => {
    const {
      books, openEditModal, activeBook,
    } = this.state;
    return (
      <Body>
        <Heading>
          <BooksHeaderImage />
          <AppTitle>
The Books Library
          </AppTitle>
          <AddBookButton onClick={() => this.setBookToEdit(-1)}>
Add Book
          </AddBookButton>
        </Heading>
        <BooksArea>
          <BooksDisplay
            books={books}
            removeBook={this.removeBook}
            setBookToEdit={this.setBookToEdit}
          />
        </BooksArea>
        <EditModal
          open={openEditModal}
          onClose={this.closeEdit}
        >
          <EditBox
            activeBook={activeBook}
            closeEdit={this.closeEdit}
            open={openEditModal}
            edit={this.edit}
            save={this.save}
            books={books}
          />
        </EditModal>
      </Body>
    );
  }
}

export default App;