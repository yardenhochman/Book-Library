import React from 'react';
import {
  ModalBody, TitleInput, AuthorInput, Heading, DateInput, SaveButton, CancelButton, ActionArea, RightEdge
} from './style';

export default class Form extends React.Component {
  componentDidMount() {
    const { books, activeBook, editIndex } = this.props;
    const withoutCurrent = [...books];
    if (editIndex!==false) withoutCurrent.splice(editIndex,1);
    ModalBody.addValidationRule('isNameUnique', () => withoutCurrent.every(book => (book.title !== activeBook.title)));
  }

  onChange = ({ target: { value, name } }) => this.props.edit(name, value);

  updateImage = () => {
    const { activeBook, books, editIndex, updateImage } = this.props;
    if (editIndex===false || activeBook.title !== books[editIndex].title) updateImage()
  }

  render = () => {
    const { activeBook, save, closeEdit } = this.props;
    if (!activeBook) return null;
    return (
      <ModalBody ref="form" onSubmit={save} onError={errors => console.log(errors)}>
      {activeBook.image && <img src={activeBook.image} alt="" />}
      <Heading>
          <TitleInput
            value={activeBook.title}
            validators={['required', 'isNameUnique']}
            errorMessages={['this field is required', 'This title already exists']}
            onChange={this.onChange}
            onBlur={this.updateImage}
          />
          <AuthorInput
          value={activeBook.author}
          validators={['required', 'matchRegexp:^([^0-9]*)$', 'isString']}
          errorMessages={['this field is required', 'Invalid Author Name', 'Invalid Author Name']}
          onChange={this.onChange}
        />

        </Heading>
        <RightEdge>
        <DateInput
            value={activeBook.date || ''}
            onChange={this.onChange}
            validators={['required']}
            errorMessages={['this field is required']}
          />
        <ActionArea>
          <CancelButton onClick={closeEdit}>Cancel</CancelButton>
          <SaveButton>Save</SaveButton>
        </ActionArea>
        </RightEdge>
      </ModalBody>
    );
  }
}
