import React from 'react';
import styled from 'styled-components';

const StyledXAxisText = styled.text`
  font-size: 10px;
  text-anchor: start;
  transform: translateY(12px) rotate(60deg);
`;

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
