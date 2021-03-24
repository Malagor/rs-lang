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
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
`;

export const WordImage = styled.div<ImageUrl>`
  min-width: 240px;
  min-height: 281px;
  background-image: url(${(props) => props.url});
  background-size: cover;
  border-radius: 10px 0 0 10px;
`;

export const ContentBlock = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  padding: 25px 20px 20px 40px;
`;
