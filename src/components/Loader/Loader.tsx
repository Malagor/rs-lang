import React, { FC } from 'react';
import { StyledLoaderContainer } from './styled';

type LoaderProps = {
  fixed?: boolean;
};

export const Loader: FC<LoaderProps> = ({ fixed }) => (
  <StyledLoaderContainer>
    {/* by james (http://codepen.io/jbutler483) */}
    <div className={fixed ? 'cssload-load cssload-load-fixed' : 'cssload-load'}>
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
