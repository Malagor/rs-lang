import {
  COLOR_LAYOUT_BLUE,
  COLOR_LAYOUT_ORANGE,
  COLOR_LAYOUT_YELLOW,
} from 'appConstants/colors';
import {
  selectCheckedDifficulty,
  selectTextBookWords,
} from 'modules/TextBookPage/selectors';
import React from 'react';
import { useSelector } from 'react-redux';
import { Word } from 'types';
import {
  Content,
  Explanations,
  ExplanationItem,
  MarkedBlock,
  MarkedItem,
  Marker,
  Title,
} from './styled';

export const ModalContent: React.FC = () => {
  const words: Word[] = useSelector(selectTextBookWords);
  const checkedDifficulty = useSelector(selectCheckedDifficulty);

  const wordPerPage = 20;

  const correctPageStatistic = words.reduce((acc, word, i) => {
    if (i === wordPerPage) return acc;
    return acc + (word.userWord?.optional?.statistics?.correct || 0);
  }, 0);

  const incorrectPageStatistic = words.reduce((acc, word, i) => {
    if (i === wordPerPage) return acc;
    return acc + (word.userWord?.optional?.statistics?.incorrect || 0);
  }, 0);

  const correctSectionStatistic = words.reduce(
    (acc, word) => acc + (word.userWord?.optional?.statistics?.correct || 0),
    0
  );

  const incorrectSectionStatistic = words.reduce(
    (acc, word) => acc + (word.userWord?.optional?.statistics?.correct || 0),
    0
  );

  const countWords = words.filter(
    (word) => word.userWord?.difficulty !== checkedDifficulty
  ).length;

  return (
    <Content>
      <div style={{ marginBottom: 20 }}>
        <Title>Page</Title>
        <MarkedBlock>
          <MarkedItem length={100} color={COLOR_LAYOUT_YELLOW} />
          <MarkedItem length={33} color={COLOR_LAYOUT_BLUE} />
          <MarkedItem length={33} color={COLOR_LAYOUT_ORANGE} />
        </MarkedBlock>
        <Explanations>
          <ExplanationItem>
            <Marker color={COLOR_LAYOUT_YELLOW} />
            <span>Learning words</span>
            <span>{countWords}</span>
          </ExplanationItem>
          <ExplanationItem>
            <Marker color={COLOR_LAYOUT_BLUE} />
            <span>Right answers</span>
            <span>{correctPageStatistic}</span>
          </ExplanationItem>
          <ExplanationItem>
            <Marker color={COLOR_LAYOUT_ORANGE} />
            <span>Mistakes</span>
            <span>{incorrectPageStatistic}</span>
          </ExplanationItem>
        </Explanations>
      </div>

      <>
        <Title>Section</Title>
        <MarkedBlock>
          <MarkedItem length={33} color={COLOR_LAYOUT_YELLOW} />
          <MarkedItem length={33} color={COLOR_LAYOUT_BLUE} />
          <MarkedItem length={33} color={COLOR_LAYOUT_ORANGE} />
        </MarkedBlock>
        <Explanations>
          <ExplanationItem>
            <Marker color={COLOR_LAYOUT_YELLOW} />
            <span>Learning words</span>
            <span>{countWords}</span>
          </ExplanationItem>
          <ExplanationItem>
            <Marker color={COLOR_LAYOUT_BLUE} />
            <span>Right answers</span>
            <span>{correctSectionStatistic}</span>
          </ExplanationItem>
          <ExplanationItem>
            <Marker color={COLOR_LAYOUT_ORANGE} />
            <span>Mistakes</span>
            <span>{incorrectSectionStatistic}</span>
          </ExplanationItem>
        </Explanations>
      </>
    </Content>
  );
};
