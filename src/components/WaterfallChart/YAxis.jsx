import React from 'react';
import styled from 'styled-components';

const StyledYAxisText = styled.text`
  text-anchor: end;
  transform: ${(props) => props.offset};
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
    value: value.split(' '),
    offset:
      scale(value) +
      bandWidth / 2 +
      bandWidth / 12 -
      (6 - yValues.length) * (bandWidth / 48), // adjusting for positioning of labels when different quarters are selected
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
          {value.length <= 1 ? (
            <StyledYAxisText
              fontSize="16px"
              offset="translate(-17px, 0px)"
              key={value}
            >
              {tickFormat(value[0])}
            </StyledYAxisText>
          ) : (
            <>
              <StyledYAxisText
                fontSize="14px"
                key={value[0]}
                offset={`translate(-17px, ${-bandWidth / 12 - 3}px)`}
              >
                {tickFormat(value[0])}
              </StyledYAxisText>
              <StyledYAxisText
                fontSize="14px"
                key={value[1]}
                offset={`translate(-17px, ${bandWidth / 12 + 3}px)`}
              >
                {tickFormat(value[1])}
              </StyledYAxisText>
            </>
          )}
        </g>
      ))}
    </g>
  );
};

export default YAxis;
