import styled from 'styled-components/macro';

export const WordListStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
`;

export const WordCardTitle = styled.h3``;

type PropsCard = {
  active: boolean;
};

export const WordCard = styled.div<PropsCard>`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 7px;
  padding: 10px 10px 20px;
  background-color: ${({ active }) => (active ? 'none' : 'yellow')};

  h2 {
    color: ${({ active }) => (active ? 'black' : 'red')};

    &:hover {
      font-size: 2rem;
    }
  }
`;

export const WordCard2 = styled(WordCard)`
  margin: 5px 10px;
`;
