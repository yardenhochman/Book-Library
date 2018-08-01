import React, { PureComponent } from 'react';
import Modal from '@material-ui/core/Modal';
import ConfirmationMessage from './ConfirmationModal';
import { Action } from './style';


export default class DeleteModal extends PureComponent {
  state = {
    open: false
  };

  openModal = () => this.setState({ open: true });

  closeModal = () => this.setState({ open: false });

  removeBook = () => {
    this.closeModal();
    this.props.removeBook();
  };

  render = () => (
    <React.Fragment>
      <Modal
        open={this.state.open}
        onClose={this.closeModal}
      >
        <ConfirmationMessage closeModal={this.closeModal} removeBook={this.removeBook}/>
      </Modal>
      <Action onClick={this.openModal}>{this.props.children}</Action>
    </React.Fragment>
  );
};