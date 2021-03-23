import styled from 'styled-components/macro';

export const WordCard = styled.div`
  display: flex;
`;

type ImageUrl = {
  url: string;
};

export const CardContainer = styled.div`
  display: flex;
  width: 783px;
  /* height: 281px; */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
`;

export const WordImage = styled.div<ImageUrl>`
  min-width: 240px;
  height: 281px;
  background-image: url(${(props) => props.url});
  background-size: cover;
`;

export const ContentBlock = styled.div`
  display: grid;
  align-content: space-between;
  padding: 25px 20px 20px 40px;
`;

export const TopPart = styled.div`
  display: grid;
  align-content: space-between;
  border-left: 3px solid #c4c4c4;
`;

export const WordBlock = styled.div`
  margin-left: 23px;
  margin-right: 9px;
`;

export const EnglishWord = styled.span`
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
`;

export const WordTranscription = styled.span`
  font-size: 20px;
  line-height: 23px;
`;

export const WordTranslate = styled.div`
  font-size: 18px;
  line-height: 21px;
  color: 888888;
`;

export const SentencesBlock = styled.div`
  display: grid;
  grid-gap: 15px;
`;
