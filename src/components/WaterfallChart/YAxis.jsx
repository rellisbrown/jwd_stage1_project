import React from 'react';
import styled from 'styled-components';

const StyledYAxisText = styled.text`
  font-size: 16px;
  text-anchor: end;
  transform: translate(-17px, -3px);
  font-weight: 600;
`;

const YAxis = ({
  dimensions,
  margin,
  scale,
  tickFormat,
  yValues,
  bandWidth,
}) => {
  const ticks = yValues.map((value) => ({
    value,
    offset:
      scale(value) +
      bandWidth / 2 +
      bandWidth / 12 -
      (5 - yValues.length) * (bandWidth / 48), // adjusting for positioning of labels when different quarters are selected
  }));

  return (
    <g transform={`translate(${margin.left}, 0)`}>
      <path
        d={[
          'M',
          0,
          dimensions.height - margin.bottom,
          'H',
          0,
          'V',
          margin.top,
        ].join(' ')}
        fill="none"
        stroke="currentColor"
      />
      {ticks.map(({ value, offset }) => (
        <g key={value} transform={`translate(0, ${offset + margin.top})`}>
          <StyledYAxisText key={value}>{tickFormat(value)}</StyledYAxisText>
        </g>
      ))}
    </g>
  );
};

export default YAxis;
