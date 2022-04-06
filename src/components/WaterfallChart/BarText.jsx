import React from 'react';
import styled from 'styled-components';

const StyledTextDiv = styled.div`
  position: absolute;
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  top: ${(props) => `${props.y}px`};
  left: ${(props) => `${props.x}px`};
  display: flex;
  pointer-events: none;
`;

const StyledText = styled.span`
  margin: auto;
  color: ${(props) => (props.alternateColor ? 'black' : 'white')};
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const BarText = ({ bandWidth, xScale, yScale, data, margin }) => {
  const width = xScale(data.value) || 0;
  const height = bandWidth / 3 || 0;
  const y = yScale(data.field) || 0;
  let x = 0;
  if (xScale(data.value) < 40) {
    x = xScale(data.accValue) - xScale(data.value) * 3 - 40;
  } else x = xScale(data.accValue) - xScale(data.value);
  return (
    <StyledTextDiv
      width={width}
      height={height}
      x={x + margin.left}
      y={y + margin.top + height}
    >
      <StyledText alternateColor={xScale(data.value) < 40}>
        {Number((data.value / 1000000).toFixed(0)).toLocaleString('en-UK')}m
      </StyledText>
    </StyledTextDiv>
  );
};

export default BarText;
