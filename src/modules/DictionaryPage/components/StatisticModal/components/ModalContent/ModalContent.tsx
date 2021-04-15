import React, { useEffect } from 'react';
import {
  COLOR_LAYOUT_BLUE,
  COLOR_LAYOUT_ORANGE,
  COLOR_LAYOUT_YELLOW,
  LEVEL_COLORS,
} from 'appConstants/colors';
import {
  selectDictionaryGroup,
  selectStatisticWords,
} from 'modules/TextBookPage/selectors';
import { selectUserId } from 'modules/Login/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { InfoBlock } from 'components/WordCard/components/TopPart/styled';
import { loadUserLearningWords } from 'modules/TextBookPage/actions';
import { Divider } from '@material-ui/core';
import { Accuracy } from './components';
import {
  Content,
  Explanations,
  ExplanationItem,
  MarkedBlock,
  MarkedItem,
  Marker,
  Title,
  Wrapper,
  WrapperMarkedBlock,
  PagesWrapper,
  PageStatistic,
  PageNumber,
  PageMarkedItem,
} from './styled';

interface ICountAnswers {
  [key: number]: {
    correct: number | undefined;
    incorrect: number | undefined;
    totalWords: number;
  };
}

export const ModalContent: React.FC = () => {
  const group = useSelector(selectDictionaryGroup);
  const userId = useSelector(selectUserId);
  const statisticWords = useSelector(selectStatisticWords);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserLearningWords(userId, group, 0, 600, true));
  }, [group, userId, dispatch]);

  const correctSectionStatistic = statisticWords.reduce(
    (acc, word) => acc + (word.userWord?.optional?.statistics?.correct || 0),
    0
  );

  const incorrectSectionStatistic = statisticWords.reduce(
    (acc, word) => acc + (word.userWord?.optional?.statistics?.incorrect || 0),
    0
  );

  const allAnswers = correctSectionStatistic + incorrectSectionStatistic;

  const accuracy = Math.round((correctSectionStatistic / allAnswers) * 100);

  const pages: ICountAnswers = {};

  statisticWords.forEach((word) => {
    pages[word.page]
      ? (pages[word.page] = {
          correct:
            (pages[word.page].correct || 0) +
            (word.userWord?.optional?.statistics!?.correct || 0),
          incorrect:
            (pages[word.page].incorrect || 0) +
            (word.userWord?.optional?.statistics?.incorrect! || 0),
          totalWords: (pages[word.page].totalWords += 1),
        })
      : (pages[word.page] = {
          correct: word.userWord?.optional?.statistics?.correct || 0,
          incorrect: word.userWord?.optional?.statistics?.incorrect || 0,
          totalWords: 1,
        });
  });

  const pagesStatistic = Object.entries(pages).map((page) => {
    const totalLength =
      page[1].totalWords + page[1].correct + page[1].incorrect;
    return (
      <PageStatistic key={page[0]}>
        <PageNumber>{+page[0] + 1}</PageNumber>
        <PageMarkedItem
          color={COLOR_LAYOUT_YELLOW}
          length={(page[1].totalWords / totalLength) * 100}
        >
          {page[1].totalWords}
        </PageMarkedItem>
        <PageMarkedItem
          color={COLOR_LAYOUT_BLUE}
          length={(page[1].correct / totalLength) * 100}
        >
          {page[1].correct}
        </PageMarkedItem>
        <PageMarkedItem
          color={COLOR_LAYOUT_ORANGE}
          length={(page[1].incorrect / totalLength) * 100}
        >
          {page[1].incorrect}
        </PageMarkedItem>
      </PageStatistic>
    );
  });

  return (
    <Content>
      <div style={{ marginBottom: 20 }}>
        <Wrapper>
          <Title>Group</Title>
          <InfoBlock color={LEVEL_COLORS[group]} title="Correct attempts">
            {group + 1}
          </InfoBlock>
        </Wrapper>
        <Wrapper>
          <Accuracy percentage={accuracy || 0} />
          <WrapperMarkedBlock>
            <MarkedBlock>
              <MarkedItem
                length={
                  (statisticWords.length / statisticWords.length) * 100 || 5
                }
                color={COLOR_LAYOUT_YELLOW}
              />
              <MarkedItem
                length={(correctSectionStatistic / allAnswers) * 100 || 5}
                color={COLOR_LAYOUT_BLUE}
              />
              <MarkedItem
                length={(incorrectSectionStatistic / allAnswers) * 100 || 5}
                color={COLOR_LAYOUT_ORANGE}
              />
            </MarkedBlock>
            <Explanations>
              <ExplanationItem>
                <Marker color={COLOR_LAYOUT_YELLOW} />
                <span>Learning words</span>
                <span>{statisticWords.length}</span>
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
          </WrapperMarkedBlock>
        </Wrapper>
      </div>

      <Divider style={{ height: 3, marginBottom: 16 }} />

      <Title>Pages</Title>
      <PagesWrapper>{pagesStatistic}</PagesWrapper>
    </Content>
  );
};
