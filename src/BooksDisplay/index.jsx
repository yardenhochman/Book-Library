import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { connect } from 'redux-zero/react';
import {
  ActionArea, Action, BookCard, BookTitle, ReleaseDate, BookAuthor, Heading, BookDetails,
} from './style';
import DeleteModal from './DeleteModal';
import actions from '../actions';

const BookCards = ({ books, removeBook, setBookToEdit }) => books.map(book => (
  <BookCard key={book.id}>
    {book.image && <img src={book.image} alt="" />}
    <BookDetails>
      <ReleaseDate>
        {book.date.replace(new RegExp('-', 'g'), '/')}
      </ReleaseDate>
      <CardContent>
        <Heading>
          <BookTitle>
            {book.title}
          </BookTitle>
          <BookAuthor>
            {book.author}
          </BookAuthor>
        </Heading>
      </CardContent>
      <ActionArea>
        <Action onClick={() => setBookToEdit(book.id)}>
          <EditIcon />
        </Action>
        <DeleteModal removeBook={() => removeBook(book.id)}>
          <DeleteIcon />
        </DeleteModal>
      </ActionArea>
    </BookDetails>
  </BookCard>
));

const mapToProps = ({ books }) => ({ books });

export default connect(mapToProps, actions)(BookCards);
