import React from 'react';
import {
  ModalBody, TitleInput, AuthorInput, Heading, DateInput, SaveButton, CancelButton, ActionArea,
} from './style';

export default class Form extends React.Component {
  componentDidMount() {
    const { books, activeBook, editIndex } = this.props;
    const withoutCurrent = [...books];
    if (editIndex!==false) withoutCurrent.splice(editIndex,1);
    ModalBody.addValidationRule('isNameUnique', () => withoutCurrent.every(book => (book.title !== activeBook.title)));
  }

    onChange = ({ target: { value, name } }) => this.props.edit(name, value);

    render = () => {
      const { activeBook, save, closeEdit } = this.props;
      if (!activeBook) return null;
      return (
        <ModalBody ref="form" onSubmit={save} onError={errors => console.log(errors)}>
          <Heading>
            <TitleInput
              value={activeBook.title}
              validators={['required', 'isNameUnique']}
              errorMessages={['this field is required', 'This title already exists']}
              onChange={this.onChange}
            />
            <DateInput
              value={activeBook.date || ''}
              onChange={this.onChange}
              validators={['required']}
              errorMessages={['this field is required']}
            />
          </Heading>
          <AuthorInput
            value={activeBook.author}
            validators={['required', 'matchRegexp:^([^0-9]*)$', 'isString']}
            errorMessages={['this field is required', 'Invalid Author Name', 'Invalid Author Name']}
            onChange={this.onChange}
          />
          <ActionArea>
            <CancelButton onClick={closeEdit}>Cancel</CancelButton>
            <SaveButton>Save</SaveButton>
          </ActionArea>
        </ModalBody>
      );
    }
}
