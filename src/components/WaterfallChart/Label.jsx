import React, { useRef } from 'react';
import styled from 'styled-components';

const StyledLabel = styled.p`
  position: absolute;
  top: ${(props) => `${props.y}px`};
  left: ${(props) => `${props.x}px`};
  font-size: 16px;
  font-weight: 600;
`;

const Label = ({ margin, innerWidth, innerHeight, text }) => {
  const labelRef = useRef();
  let offset = 0;
  if (labelRef.current) {
    offset = labelRef.current.getBoundingClientRect().width;
  }
  const x = margin.left + innerWidth / 2 - offset / 2;
  const y = margin.top + innerHeight;
  if (x && y) {
    return (
      <StyledLabel ref={labelRef} x={x} y={y}>
        {text}
      </StyledLabel>
    );
  }
  return <></>;
};

export default Label;
