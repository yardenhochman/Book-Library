import React from 'react';
import { connect } from 'redux-zero/react';
import {
  ModalBody, TitleInput, AuthorInput, Heading, DateInput, SaveButton, CancelButton, ActionArea, RightEdge, EditModal,
} from './style';
import actions from '../actions';
import { collectImage } from '../Helpers';

class Form extends React.Component {
  componentDidMount() {
    const { books, activeBook, editIndex } = this.props;
    const withoutCurrent = [...books];
    if (editIndex !== false) withoutCurrent.splice(editIndex, 1);
    ModalBody.addValidationRule('isNameUnique', () => withoutCurrent.every(book => (book.title !== activeBook.title)));
  }

  onChange = ({ target: { value, name: property } }) => {
    const { activeBook, setActiveBook } = this.props;
    activeBook[property] = value.capitalize();
    setActiveBook(activeBook);
  }

  updateImage = () => {
    const {
      activeBook, books, editIndex, updateImage,
    } = this.props;
    if (editIndex === false || activeBook.title !== books[editIndex].title) updateImage();
  }


  closeEdit = () => {
    const {
      setEditIndex, setActiveBook, save, setEditModal,
    } = this.props;
    setEditModal(false);
    setEditIndex(false);
    setActiveBook(false);
  }

  render = () => {
    const {
      activeBook, openEditModal, save,
    } = this.props;
    if (!activeBook) return null;
    return (
      <EditModal
        open={openEditModal}
        onClose={this.cleanEditState}
      >
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
              <CancelButton onClick={this.closeEdit}>
Cancel
              </CancelButton>
              <SaveButton>
save
              </SaveButton>
            </ActionArea>
          </RightEdge>
        </ModalBody>
      </EditModal>
    );
  }
}

const mapToProps = ({
  books, openEditModal, activeBook, editIndex,
}) => ({
  books, openEditModal, activeBook, editIndex,
});


export default connect(mapToProps, actions)(Form);
