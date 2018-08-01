import React from 'react';
import {
  ModalBody, BookTitle, ActionArea, SaveButton,
} from './style';

export default ({ removeBook, closeModal }) => (
  <ModalBody>
    <BookTitle>
Are you sure?
    </BookTitle>
    <ActionArea>
      <SaveButton onClick={closeModal} color="secondary" variant="raised">
Cancel
      </SaveButton>
      <SaveButton onClick={removeBook} color="primary" variant="raised">
DELETE
      </SaveButton>
    </ActionArea>
  </ModalBody>
);
