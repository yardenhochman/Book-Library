import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Modal from '@material-ui/core/Modal';

const ButtonStyle = styled(Button)`
  height: 25px;
  margin-left: 15px;
`;

export const SaveButton = ButtonStyle.extend.attrs({
  type: 'submit',
  color: 'primary',
  variant: 'raised',
})``;
export const CancelButton = ButtonStyle.extend.attrs({
  color: 'secondary',
  variant: 'raised',
})``;
export const EditModal = styled(Modal).attrs({
  disableAutoFocus: true,
})``;

export const ModalBody = styled(ValidatorForm)`
  position: relative;
  top: 40%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  max-width: 600px;
  padding: 20px;
  background: #ffffff;
`;

export const TitleInput = styled(TextValidator).attrs({
  name: 'title',
  label: 'Title',
})`
  color: rgba(0, 0, 0, 0.87);
  font-size: 1.5rem;
  font-weight: 400;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  line-height: 1.35417em;

  & > div > input {
    text-align: center;
  }
`;
export const DateInput = styled(TextValidator).attrs({
  id: 'date',
  type: 'date',
  name: 'date',
})`
  color: rgba(0, 0, 0, 0.87);
  font-weight: 400;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  line-height: 1.35417em;
  font-size: 0.875rem;

  & > div > input {
    margin-left: 30px;
  }
`;

export const AuthorInput = styled(TextValidator).attrs({
  name: 'author',
  label: 'Author',
})`
  font-size: 0.875rem;
  font-weight: 400;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  line-height: 1.46429em;
  color: rgba(0, 0, 0, 0.54);
  flex-shrink: 1;

  & > div > input {
    text-align: center;
  }
`;
export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  justify-content: space-evenly;
  margin-bottom: 1vh;
  padding: 30px 0 40px 30px;
`;
export const ActionArea = styled.div`
  position: relative;
  display: flex;
  align-self: flex-end;
`;

export const RightEdge = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
