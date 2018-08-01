import axios from 'axios';
import React, { Component } from 'react';
import BooksDisplay from './BooksDisplay';
import EditBox from './EditBox';
import {
  cleanUpJSON, collectImages, collectImage,
} from './Helpers';
import {
  AddBookButton, AppTitle, Body, BooksArea, BooksHeaderImage, EditModal, Heading,
} from './style';

class App extends Component {
  state = {
    books: [],
    openEditModal: false,
    activeBook: false,
    editIndex: false,
  }

  componentDidMount = () => {
    axios('books.json')
      .then(async ({ data: books }) => this.setState({ books: cleanUpJSON(await collectImages(books)) }))
      .catch(err => console.log(err));
  }

  setBookToEdit = (id) => {
    if (id === -1) return this.setState({
      editIndex: false,
      openEditModal: true,
      activeBook: {
        id: Math.floor(Math.random() * 1000000000),
        title: '',
        author: '',
        published_date: '',
      },
    });

    const { books } = this.state;
    const editIndex = books.findIndex(book => book.id === id);
    const activeBook = { ...books[editIndex] };
    return this.setState({ editIndex, activeBook, openEditModal: true });
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

  save = async () => {
    const { books, activeBook, editIndex } = this.state;
    activeBook.title = activeBook.title.removeSpecialCharacters().capitalize();
    const newBook = editIndex === false;
    if (newBook) books.push(await collectImage(activeBook));
    else books[editIndex] = { ...activeBook };
    this.setState({ books });
    this.closeEdit();
  }

  closeEdit = () => this.setState({
    editIndex: false,
    openEditModal: false,
    activeBook: {
      id: Math.floor(Math.random() * 1000000000),
      title: '',
      author: '',
      published_date: '',
    },
  });

  render = () => {
    const {
      books, openEditModal, activeBook, editIndex,
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
            newBook={editIndex === false}
          />
        </EditModal>
      </Body>
    );
  }
}

export default App;
