import { selectTextBookWords } from 'modules/TextBookPage/selectors';
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

  // console.log(words.length);
  // console.log(correctPageStatistic, incorrectPageStatistic);
  // console.log(correctSectionStatistic, incorrectSectionStatistic);

  return (
    <Content>
      <div style={{ marginBottom: 20 }}>
        <Title>Page</Title>
        <MarkedBlock>
          <MarkedItem length={33} color="#F79928" />
          <MarkedItem length={33} color="#0252CC" />
          <MarkedItem length={33} color="#FA5833" />
        </MarkedBlock>
        <Explanations>
          <ExplanationItem>
            <Marker color="#F79928" />
            <span>Learning words</span>
            <span>{words.length}</span>
          </ExplanationItem>
          <ExplanationItem>
            <Marker color="#0252CC" />
            <span>Right answers</span>
            <span>{correctPageStatistic}</span>
          </ExplanationItem>
          <ExplanationItem>
            <Marker color="#FA5833" />
            <span>Mistakes</span>
            <span>{incorrectPageStatistic}</span>
          </ExplanationItem>
        </Explanations>
      </div>

      <>
        <Title>Section</Title>
        <MarkedBlock>
          <MarkedItem length={33} color="#F79928" />
          <MarkedItem length={33} color="#0252CC" />
          <MarkedItem length={33} color="#FA5833" />
        </MarkedBlock>
        <Explanations>
          <ExplanationItem>
            <Marker color="#F79928" />
            <span>Learning words</span>
            <span>{words.length}</span>
          </ExplanationItem>
          <ExplanationItem>
            <Marker color="#0252CC" />
            <span>Right answers</span>
            <span>{correctSectionStatistic}</span>
          </ExplanationItem>
          <ExplanationItem>
            <Marker color="#FA5833" />
            <span>Mistakes</span>
            <span>{incorrectSectionStatistic}</span>
          </ExplanationItem>
        </Explanations>
      </>
    </Content>
  );
};
