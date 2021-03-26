import styled from 'styled-components/macro';

export const GroupSelectorPosition = styled.div`
  position: sticky;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TitleGroupSelector = styled.span`
  display: flex;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
`;
