import React, { FC } from 'react';
import cat from 'assets/images/cat.png';
import { ErrorWrapper, ErrorImage } from './styled';

type ErrorMessageProps = { text?: string };

export const ErrorMessage: FC<ErrorMessageProps> = ({ text }) => (
  <ErrorWrapper>
    <ErrorImage src={cat} alt="Error" />
    <p style={{ textAlign: 'center' }}>
      {text ||
        'An error occurred, the program components did not understand each other. We sent linguists to them with a dictionary'}
    </p>
  </ErrorWrapper>
);
