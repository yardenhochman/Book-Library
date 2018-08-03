import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'redux-zero/react';
import BooksDisplay from './BooksDisplay';
import EditBox from './EditBox';
import {
  cleanUpJSON, collectImages, collectImage,
} from './Helpers';
import {
  AddBookButton, AppTitle, Body, BooksArea, BooksHeaderImage, Heading,
} from './style';
import actions from './actions';

class App extends Component {
  componentDidMount = async () => {
    const { loadBooks } = this.props;
    const { data: books } = await axios('books.json');
    loadBooks(cleanUpJSON(await collectImages(books)));
  }

  setBookToEdit = (currentBookId) => {
    if (currentBookId === -1) return this.addNewBook();
    const {
      books, setEditIndex, setActiveBook, setEditModal,
    } = this.props;
    const editIndex = books.findIndex(book => book.id === currentBookId);
    const activeBook = { ...books[editIndex] };
    setEditIndex(editIndex);
    setActiveBook(activeBook);
    setEditModal(true);
  }

  removeBook = (currentBookId) => {
    const { books, loadBooks } = this.props;
    const indexToRemove = books.findIndex(book => book.id === currentBookId);
    books.splice(indexToRemove, 1);
    loadBooks(books);
  }

  updateImage = async () => {
    const { activeBook, setActiveBook } = this.props;
    const withImage = await collectImage(activeBook);
    activeBook.image = withImage.image;
    setActiveBook(activeBook);
  }

  save = async () => {
    const {
      setEditModal, loadBooks, setEditIndex, books, activeBook, editIndex,
    } = this.props;
    setEditModal(false);
    activeBook.title = activeBook.title.removeSpecialCharacters().capitalize();
    const newBook = editIndex === false;
    if (newBook) {
      books.push(await collectImage(activeBook));
    } else if (newBook.title !== books[editIndex].title) {
      books[editIndex] = await collectImage(activeBook);
    } else books[editIndex] = { ...activeBook };
    loadBooks(books);
    this.cleanEditState();
  }

  addNewBook = () => {
    const { setEditIndex, setEditModal, addNewBook } = this.props;
    setEditIndex(false);
    setEditModal(true);
    addNewBook();
  }


  render = () => {
    const {
      books, openEditModal, activeBook, editIndex,
    } = this.props;
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
            removeBook={this.removeBook}
            setBookToEdit={this.setBookToEdit}
          />
        </BooksArea>
        <EditBox
          save={this.save}
          updateImage={this.updateImage}
        />
      </Body>
    );
  }
}
const mapToProps = ({
  books, openEditModal, activeBook, editIndex,
}) => ({
  books, openEditModal, activeBook, editIndex,
});


export default connect(mapToProps, actions)(App);
