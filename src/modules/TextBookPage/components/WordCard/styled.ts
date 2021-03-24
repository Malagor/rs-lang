import styled from 'styled-components/macro';

export const WordCard = styled.div`
  display: flex;
`;

type ImageUrl = {
  url: string;
};

export const CardContainer = styled.div`
  display: flex;
  max-width: 832px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  padding: 24px;

  @media (max-width: 860px) {
    flex-direction: column;
    /* min-height: 676px; */
  }
`;

export const WordImage = styled.div<ImageUrl>`
  min-width: 240px;
  min-height: 281px;
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-position: center;

  @media (max-width: 860px) {
    margin-bottom: 24px;
    min-height: 307px;
  }
`;

export const ContentBlock = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  padding-left: 40px;

  @media (max-width: 860px) {
    padding-left: 0;
    padding-bottom: 16px;
  }
`;
