import React, { PureComponent } from 'react';
import Modal from '@material-ui/core/Modal';
import ConfirmationMessage from './ConfirmationModal';
import { Action } from './style';


export default class DeleteModal extends PureComponent {
  state = {
    open: false,
  };

  openModal = () => this.setState({ open: true });

  closeModal = () => this.setState({ open: false });

  removeBook = () => {
    this.closeModal();
    this.props.removeBook();
  };

  render = () => {
    const {
      state: { open }, props: { children }, closeModal, removeBook, openModal,
    } = this;
    return (
      <React.Fragment>
        <Modal
          open={open}
          onClose={closeModal}
        >
          <ConfirmationMessage closeModal={closeModal} removeBook={removeBook} />
        </Modal>
        <Action onClick={openModal}>
          {children}
        </Action>
      </React.Fragment>
    );
  }
}
