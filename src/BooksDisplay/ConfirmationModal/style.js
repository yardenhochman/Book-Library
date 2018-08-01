import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

export const ModalBody = styled(Card)`
  margin: 30vh 20vw;
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

export const SaveButton = styled(Button)`
  height: 25px;
  margin-left: 15px;
`;
