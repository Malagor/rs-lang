import React from 'react';
import { StyledLoaderContainer } from './styled';

export const Loader = () => (
  <StyledLoaderContainer>
    {/* by james (http://codepen.io/jbutler483) */}
    <div className="cssload-load">
      <div className="cssload-blockcont">
        <div className="cssload-block" />
        <div className="cssload-block" />
        <div className="cssload-block" />

        <div className="cssload-block" />
        <div className="cssload-block" />
        <div className="cssload-block" />

        <div className="cssload-block" />
        <div className="cssload-block" />
        <div className="cssload-block" />
      </div>
    </div>
  </StyledLoaderContainer>
);
