import React, { FC } from 'react';
import { Paper, Button, lighten } from '@material-ui/core';
import styled from 'styled-components';
import {
  COLOR_LAYOUT_BACKGROUND,
  COLOR_LAYOUT_BLUE,
} from 'appConstants/colors';
import { useHistory } from 'react-router-dom';

type NotEnoughWordsMessageProps = {
  minWordsCount: number;
};

export const NotEnoughWordsMessage: FC<NotEnoughWordsMessageProps> = ({
  minWordsCount,
}) => {
  const history = useHistory();
  return (
    <MessageContainer variant="outlined">
      <MessageHeader>Too Few Words</MessageHeader>
      <MessageText>
        Sorry, you need at least {minWordsCount} words to play this game. Go
        pick up more words and then try again.
      </MessageText>
      <OkButton
        variant="contained"
        onClick={() => {
          history.goBack();
        }}
      >
        OK
      </OkButton>
    </MessageContainer>
  );
};

const MessageContainer = styled(Paper)`
  max-width: 480px;
  margin: 0 auto;
  padding: 16px;
`;

const MessageHeader = styled.h3`
  margin: 0;
  margin-bottom: 10px;
  text-align: center;
  text-transform: uppercase;
`;

const MessageText = styled.p`
  margin: 0;
`;

const OkButton = styled(Button)`
  display: block;
  margin-right: 20px;
  margin-left: auto;
  background-color: ${COLOR_LAYOUT_BLUE};
  color: ${COLOR_LAYOUT_BACKGROUND};
  &:hover {
    background-color: ${lighten(COLOR_LAYOUT_BLUE, 0.2)};
  }
`;
