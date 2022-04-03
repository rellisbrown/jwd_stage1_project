import React from 'react';

const XAxis = ({ dimensions, margin }) => (
  <g transform={`translate(0, ${dimensions.height - margin.bottom})`}>
    <path
      d={['M', margin.left, 0, 'H', dimensions.width - margin.right].join(' ')}
      fill="none"
      stroke="currentColor"
    />
  </g>
);

export default XAxis;
