import styled from 'styled-components/macro';
import { COLOR_LAYOUT_GRAY, COLOR_LAYOUT_WHITE } from 'appConstants/colors';
import { Breakpoints } from '@material-ui/core/styles/createBreakpoints';

type StyledPaginationContainerProps = {
  highlightColor: string;
  breakpoints: Breakpoints;
};

export const StyledPaginationContainer = styled.div<StyledPaginationContainerProps>`
  .root {
    display: flex;
    justify-content: center;
    padding: 0;
    margin: 0 auto;
    list-style: none;
    font-size: 1.4rem;
  }

  .page-item,
  .previous-page-item,
  .next-page-item,
  .break-item {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    margin: 0 8px;
    background: ${COLOR_LAYOUT_WHITE};
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    user-select: none;
    transition: color 0.3s;

    &:hover {
      border: 2px solid ${({ highlightColor }) => highlightColor};
      color: ${({ highlightColor }) => highlightColor};
    }
  }

  .page-link,
  .previous-page-link,
  .next-page-link,
  .break-link {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    outline: none;
    cursor: pointer;
  }

  .page-item-active {
    color: ${({ highlightColor }) => highlightColor};
    border: 2px solid ${({ highlightColor }) => highlightColor};
  }

  .page-item-disabled {
    color: ${COLOR_LAYOUT_GRAY};

    &:hover {
      color: ${COLOR_LAYOUT_GRAY};
      border: none;
    }
  }

  .page-item-disabled .page-link,
  .page-item-disabled .previous-page-link,
  .page-item-disabled .next-page-link {
    cursor: default;
  }

  ${(props) => props.breakpoints.down('md')} {
    .root {
      font-size: 1.2rem;
    }
  }

  ${(props) => props.breakpoints.down('xs')} {
    .root {
      font-size: 1rem;
      margin: 10px auto;
    }

    .page-item,
    .previous-page-item,
    .next-page-item,
    .break-item {
      width: 32px;
      height: 32px;
    }
  }
`;
