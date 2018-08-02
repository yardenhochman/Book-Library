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

  componentDidMount = async () => {
    const { data: books } = await axios('books.json');
    this.setState({ books: cleanUpJSON(await collectImages(books)) });
  }

  setBookToEdit = currentBookId => {
    if (currentBookId === -1) return this.addNewBook()

    const { books } = this.state;
    const editIndex = books.findIndex(book => book.id === currentBookId);
    const activeBook = { ...books[editIndex] };
    return this.setState({ editIndex, activeBook, openEditModal: true });
  }

  removeBook = currentBookId => {
    const { books } = this.state;
    const indexToRemove = books.findIndex(book => book.id === currentBookId);
    books.splice(indexToRemove, 1);
    this.setState({ books });
  }

  updateImageOnEdit = async (book) => {
    const withImage = await collectImage(book);
    const { activeBook } = this.state;
    activeBook.image = withImage.image;
    this.setState({ activeBook })
  }

  edit = async (property, value) => {
    const { activeBook } = this.state;
    activeBook[property] = value.capitalize();
    this.setState({ activeBook });
    this.updateImageOnEdit(activeBook)
  }

  save = async () => {
    const { books, activeBook, editIndex } = this.state;
    activeBook.title = activeBook.title.removeSpecialCharacters().capitalize();
    const newBook = editIndex === false;
    if (newBook)
      books.push(await collectImage(activeBook));
    else if (newBook.title!==books[editIndex].title)
      books[editIndex] = await collectImage(activeBook)
    else
      books[editIndex] = { ...activeBook };
    this.setState({ books });
    this.closeEdit();
  }
  addNewBook = () => this.setState({
    editIndex: false,
    openEditModal: true,
    activeBook: {
      id: Math.floor(Math.random() * 1000000000),
      title: '',
      author: '',
      published_date: '',
    },
  });
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
    const { books, openEditModal, activeBook, editIndex } = this.state;
    return (
      <Body>
        <Heading>
          <BooksHeaderImage />
          <AppTitle>The Books Library</AppTitle>
          <AddBookButton onClick={() => this.setBookToEdit(-1)}>Add Book</AddBookButton>
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
            editIndex={editIndex}
          />
        </EditModal>
      </Body>
    );
  }
}

export default App;
