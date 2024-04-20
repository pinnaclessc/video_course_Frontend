// ClipLoader.js

import React from 'react';
import { css } from '@emotion/react';
import { ClipLoader as ReactClipLoader } from 'react-spinners';

const ClipLoader = ({ color, size, loading }) => {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: ${color}; 
  `;

  return (
    <div className="clip-loader">
      <ReactClipLoader color={color} css={override} size={size} loading={loading} />
    </div>
  );
};

export default ClipLoader;
