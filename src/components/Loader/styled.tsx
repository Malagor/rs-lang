import styled from 'styled-components/macro';
import {
  COLOR_LEVEL_1,
  COLOR_LEVEL_2,
  COLOR_LEVEL_3,
  COLOR_LEVEL_4,
  COLOR_LEVEL_5,
} from 'appConstants/colors';
import { LOADER_BLOCK_SIZE } from 'appConstants';

export const StyledLoaderContainer = styled.div`
  /* by james (http://codepen.io/jbutler483) */
  .cssload-load {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${LOADER_BLOCK_SIZE * 3}px;
    height: ${LOADER_BLOCK_SIZE * 3}px;
  }

  .cssload-blockcont {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .cssload-block {
    position: relative;
    height: ${LOADER_BLOCK_SIZE}px;
    width: ${LOADER_BLOCK_SIZE}px;
    display: inline-block;
    background: ${COLOR_LEVEL_1};
    transition: all 0.68s;
    animation: cssload-rot 4.25s linear infinite;
  }
  .cssload-block:nth-child(1) {
    animation-delay: 2.55s;
  }
  .cssload-block:nth-child(2) {
    animation-delay: 1.275s;
    animation: cssload-rot 10.2s linear infinite;
  }
  .cssload-block:nth-child(3) {
    animation-delay: 1.7s;
  }
  .cssload-block:nth-child(4) {
    animation-delay: 0.17s;
  }
  .cssload-block:nth-child(5) {
    animation-delay: 3.4s;
  }
  .cssload-block:nth-child(6) {
    animation-delay: 1.7s;
    animation: cssload-rot 5.95s linear infinite;
  }
  .cssload-block:nth-child(7) {
    animation-delay: 0.34s;
  }
  .cssload-block:nth-child(8) {
    animation-delay: 1.275s;
    animation: cssload-rot 5.1s linear infinite;
  }
  .cssload-block:nth-child(9) {
    animation-delay: 21.25s;
    animation: cssload-rot 6.8s linear infinite;
  }

  @keyframes cssload-rot {
    0% {
      transform: none;
    }
    20% {
      transform: rotateZ(-90deg) rotateY(180deg);
    }
    40% {
      background: ${COLOR_LEVEL_2};
      transform: none;
    }
    60% {
      background: ${COLOR_LEVEL_3};
    }
    80% {
      background: ${COLOR_LEVEL_4};
    }
    90% {
      transform: none;
      background: ${COLOR_LEVEL_5};
    }
  }
`;
