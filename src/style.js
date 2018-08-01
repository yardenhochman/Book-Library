import styled from "styled-components";
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';


export const BooksHeaderImage = styled.header`
  height: 150px;
  padding: 20px;
  color: black;
  background-image: url("https://image.ibb.co/gcd9G8/1513115220_1513115220_goodreads_misc.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: auto;
`;
export const AppTitle = styled.h1`
  font-size: 1.5em;
`;
export const Body = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 0 10vw;
`;
export const Heading = styled.div`
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
`;
export const BooksArea = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 1060px) {
    justify-content: center;
  }
`;

export const EditModal = styled(Modal).attrs({
  disableAutoFocus: true
})``;

export const AddBookButton = styled(Button).attrs({
  variant: "raised",
  color: "primary"
})`
  align-self: flex-start;
`;