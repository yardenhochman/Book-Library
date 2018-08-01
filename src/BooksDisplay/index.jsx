import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CardMedia from '@material-ui/core/CardMedia';
import {
  ActionArea, Action, BookCard, BookTitle, ReleaseDate, BookAuthor, Heading, BookDetails,
} from './style';
import DeleteModal from './DeleteModal';

export default ({ books, removeBook, setBookToEdit }) => books.map((book, i) => (
  <BookCard key={book.title + i}>
    {
    book.image && (
    <CardMedia>
      <img src={book.image} />
    </CardMedia>
    )
  }
    <BookDetails>
      <ReleaseDate>
        {book.date.replace(new RegExp('-', 'g'), '/')}
      </ReleaseDate>
      <CardContent>
        <Heading>
          <BookTitle>
            {book.title}
          </BookTitle>

        </Heading>
        <BookAuthor>
          {book.author}
        </BookAuthor>
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