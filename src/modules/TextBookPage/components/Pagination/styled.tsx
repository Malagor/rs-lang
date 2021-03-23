import styled from 'styled-components/macro';

export const StyledPaginationContainer = styled.div`
  .root {
    display: flex;
    justify-content: space-between;
    width: 432px;
    padding: 0;
    margin: 32px auto;
    list-style: none;
    font-size: 1.4rem;
  }

  .page-item,
  .previous-page-item,
  .next-page-item {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    user-select: none;
    transition: color 0.3s;

    &:hover {
      border: 2px solid #f79928;
      color: #f79928;
    }
  }

  .page-link,
  .previous-page-link,
  .next-page-link {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    outline: none;
    cursor: pointer;
  }

  .page-item-active {
    color: #f79928;
  }

  .page-item-disabled {
    color: #c4c4c4;

    &:hover {
      color: #c4c4c4;
      border: none;
    }
  }

  .page-item-disabled .page-link,
  .page-item-disabled .previous-page-link,
  .page-item-disabled .next-page-link {
    cursor: default;
  }
`;
