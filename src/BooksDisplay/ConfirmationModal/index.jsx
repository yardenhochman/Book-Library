import React from 'react';
import {
  ModalBody, BookTitle, ActionArea, SaveButton,
} from './style';
import { CancelButton } from '../../EditBox/style';

export default ({ removeBook, closeModal }) => (
  <ModalBody>
    <BookTitle>Are you sure?</BookTitle>
    <ActionArea>
      <CancelButton onClick={closeModal}>CANCEL</CancelButton>
      <SaveButton onClick={removeBook}>OK</SaveButton>
    </ActionArea>
  </ModalBody>
);
