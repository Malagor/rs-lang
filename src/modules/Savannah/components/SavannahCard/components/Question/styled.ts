import styled, { keyframes } from 'styled-components/macro';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { COLOR_LAYOUT_BACKGROUND } from 'appConstants/colors';
import { UserAnswer } from '../../SavannahCard';

export const QuestionWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 500px;
  width: 500px;
  border-bottom: 1px solid #eafff2;
`;

const letterSpacing = keyframes`
  0% {
    letter-spacing: 0;
  }

  100% {
  opacity: 0;
    letter-spacing: 50px;
  }
`;

const slidedown = keyframes`
  95% {
  opacity: 1;
  }
  100% {
    font-size: 0;
    top: 120%;
    opacity: 0;
  }
`;

export const CurrentWord = styled.div<{
  userAnswerState: UserAnswer;
  isEnd: boolean;
}>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  padding: 0;
  font-size: 35px;
  color: ${COLOR_LAYOUT_BACKGROUND};
  opacity: 0;
  animation: ${({ isEnd, userAnswerState }) =>
      // eslint-disable-next-line no-nested-ternary
      isEnd
        ? letterSpacing
        : // eslint-disable-next-line no-nested-ternary
        userAnswerState === UserAnswer.NO_ANSWER
        ? ''
        : userAnswerState === UserAnswer.WRONG
        ? letterSpacing
        : slidedown}
    1s normal forwards;
`;

export const useStyles = makeStyles({
  rightAnswer: {
    color: 'red',
  },
  wrongAnswer: {
    color: 'blue',
  },
});
