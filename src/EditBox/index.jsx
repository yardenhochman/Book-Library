import React from 'react';
import {
  ModalBody, TitleInput, AuthorInput, Heading, DateInput, SaveButton, ActionArea,
} from './style';

export default class Form extends React.Component {
  componentDidMount() {
    const { books, activeBook } = this.props;
    ModalBody.addValidationRule('isNameUnique', () => books.every(book => (book.title !== activeBook.title)));
  }

    onChange = ({ target: { value, name } }) => this.props.edit(name, value);

    render = () => {
      const {
        activeBook, save, closeEdit, error,
      } = this.props;
      if (!activeBook) return null;
      return (
        <ModalBody ref="form" onSubmit={save} onError={errors => console.log(errors)}>
          <Heading>
            <TitleInput
              value={activeBook.title}
              name="title"
              label="Title"
              validators={['required', 'isNameUnique']}
              errorMessages={['this field is required', 'This title already exists']}
              onChange={this.onChange}
            />
            <DateInput
              value={activeBook.date || ''}
              name="date"
              onChange={this.onChange}
              validators={['required']}
              errorMessages={['this field is required']}
            />
          </Heading>
          <AuthorInput
            value={activeBook.author}
            name="author"
            label="Author"
            validators={['required', 'matchRegexp:^([^0-9]*)$', 'isString']}
            errorMessages={['this field is required', 'Invalid Author Name', 'Invalid Author Name']}
            onChange={this.onChange}
          />
          <ActionArea>
            <SaveButton onClick={closeEdit} color="secondary" variant="raised">
Cancel
            </SaveButton>
            <SaveButton type="submit" color="primary" variant="raised">
OK
            </SaveButton>
          </ActionArea>
        </ModalBody>
      );
    }
}
