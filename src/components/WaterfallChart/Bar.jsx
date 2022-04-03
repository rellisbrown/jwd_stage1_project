import React from 'react';
import styled from 'styled-components';

const StyledRect = styled.rect`
  transition: stroke-width 0.2s ease;
  :hover {
    stroke: red;
    stroke-width: 2px;
  }
`;

const Bar = ({ bandWidth, xScale, yScale, data, fill, stroke }) => {
  const width = xScale(data.value);
  const y = yScale(data.field);
  const x = xScale(data.accValue) - xScale(data.value);
  return (
    <StyledRect
      width={width}
      height={bandWidth / 3}
      x={x}
      y={y + bandWidth / 3}
      fill={fill}
      stroke={stroke}
    />
  );
};

export default Bar;
