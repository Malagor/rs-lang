import styled from 'styled-components/macro';
import { COLOR_LAYOUT_GRAY } from 'appConstants/colors';
import { lighten } from '@material-ui/core';

export const NavContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  background-color: ${lighten(COLOR_LAYOUT_GRAY, 0.7)};
  border-radius: 10px;

  a {
    text-decoration: none;
    color: inherit;
    padding: 0 8px;
  }
`;
