import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';

export const BookDetails = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export const ActionArea = styled(CardActions)`
  justify-content: flex-end;
  height: 25px;
`;
export const Action = styled(Button).attrs({
  size: 'small',
  color: 'primary',
})`
  display: none;
`;
export const BookCard = styled(Card)`
  display: flex;
  min-width: 400px;
  width: 23vw;
  text-align: left;
  margin-bottom: 5vh;
  padding: 1vh;
  background: rgb(255, 154, 96, 0.2);
  background: #f2f2f2;

  &:hover ${Action} {
    display: block;
  }
`;
// #
export const BookTitle = styled(Typography).attrs({
  variant: 'headline',
  component: 'h2',
})`
  font-size: 1.6rem;
`;
export const ReleaseDate = styled(Typography).attrs({
  component: 'p',
  type: 'date',
})`
  align-self: flex-end;
`;
export const BookAuthor = styled(Typography).attrs({
  color: 'textSecondary',
})`
`;
export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
