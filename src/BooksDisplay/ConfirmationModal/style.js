import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

export const ModalBody = styled(Card)`
  position: relative;
  top: 40%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 600px;
  padding: 60px;
  background: #ffffff;
`;

export const BookTitle = styled(Typography).attrs({
  variant: 'headline',
  component: 'h2',
})``;

export const ActionArea = styled.div`
  position: relative;
  top: 2.5vh;
  left: 1.5vw;
  display: flex;
  align-self: flex-end;
`;
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
