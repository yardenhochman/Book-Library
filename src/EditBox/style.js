import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const ButtonStyle = styled(Button)`
  height: 25px;
  margin-left: 15px;
`;

export const SaveButton = ButtonStyle.extend.attrs({
  type:"submit",
  color:"primary",
  variant:"raised"
})``;
export const CancelButton = ButtonStyle.extend.attrs({
  color:"secondary",
  variant:"raised"
})``;


export const ModalBody = styled(ValidatorForm)`
  margin: 30vh 20vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 600px;
  padding: 60px;
  background: #ffffff;
`;

export const TitleInput = styled(TextValidator).attrs({
  name:"title",
  label:"Title"
})`
  color: rgba(0, 0, 0, 0.87);
  font-size: 1.5rem;
  font-weight: 400;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  line-height: 1.35417em;
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
`;

export const AuthorInput = styled(TextValidator).attrs({
  name:"author",
  label:"Author"
})`
  font-size: 0.875rem;
  font-weight: 400;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  line-height: 1.46429em;
  color: rgba(0, 0, 0, 0.54);
  flex-shrink: 1;
`;
export const Heading = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 1vh;
`;
export const ActionArea = styled.div`
  position: relative;
  top: 2.5vh;
  left: 1.5vw;
  display: flex;
  align-self: flex-end;
`;
