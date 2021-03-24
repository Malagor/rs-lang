import styled from 'styled-components/macro';
import { MOBILE_WIDTH } from 'appConstants';
import {
  COLOR_LAYOUT_YELLOW,
  COLOR_LAYOUT_GRAY,
  COLOR_WHITE,
} from 'appConstants/colors';

export const StyledPaginationContainer = styled.div`
  .root {
    display: flex;
    justify-content: center;
    padding: 0;
    margin: 32px auto;
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
    background: ${COLOR_WHITE};
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    user-select: none;
    transition: color 0.3s;

    &:hover {
      border: 2px solid ${COLOR_LAYOUT_YELLOW};
      color: ${COLOR_LAYOUT_YELLOW};
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
    color: ${COLOR_LAYOUT_YELLOW};
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

  @media (max-width: ${MOBILE_WIDTH}px) {
    .root {
      font-size: 1.2rem;
    }

    .page-item,
    .previous-page-item,
    .next-page-item,
    .break-item {
      width: 32px;
      height: 32px;
      margin: 0 4px;
    }
  }
`;
