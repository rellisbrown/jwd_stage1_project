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
  color: white;
`;

const BarText = ({ bandWidth, xScale, yScale, data, margin }) => {
  const width = xScale(data.revenue) || 0;
  const height = bandWidth / 3 || 0;
  const y = yScale(data.quarter) || 0;
  const x = xScale(data.accRevenue) - xScale(data.revenue) || 0;

  return (
    <StyledTextDiv
      width={width}
      height={height}
      x={x + margin.left}
      y={y + margin.top + height}
    >
      <StyledText>
        {Number((data.revenue / 1000000).toFixed(0)).toLocaleString('en-UK')}m
      </StyledText>
    </StyledTextDiv>
  );
};

export default BarText;
