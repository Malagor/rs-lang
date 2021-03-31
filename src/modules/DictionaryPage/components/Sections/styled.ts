import styled from 'styled-components/macro';

export const SectionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 567px;
  width: 100%;

  @media (max-width: ${(props) => props.theme.breakpoints.values.md}px) {
    flex-wrap: wrap;
    justify-content: center;
    /* max-width: 400px; */
    margin: 0 auto;
  }
  /* flex-wrap: wrap; */
  /* margin: 0px -8px; */

  /* a {
    text-decoration: none;
    color: inherit;
    padding: 0px 8px;
  } */
  /* @media (max-width: ${(props) => props.theme.breakpoints.values.md}px) {
    justify-content: center;
  } */
`;

export const Section = styled.div<{ active: boolean }>`
  /* padding: 0px 8px; */
  display: flex;
  align-items: center;
  padding: 12px 24px 12px 16px;
  margin-bottom: 16px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: ${({ active }) =>
    active ? '0px 0px 10px rgba(0, 0, 0, 0.15)' : ''};

  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: ${(props) => props.theme.breakpoints.values.md}px) {
    padding: 12px 12px 12px 8px;
    & + div {
      margin-left: 16px;
    }
  }
`;

export const Marker = styled.div<{ colorGroup?: string }>`
  width: 4px;
  height: 32px;
  margin-right: 24px;
  border-radius: 10px;
  background-color: ${({ colorGroup }) => colorGroup || '#c4c4c4'};

  @media (max-width: ${(props) => props.theme.breakpoints.values.md}px) {
    height: 16px;
    margin-right: 8px;
  }
`;

export const Title = styled.div``;
