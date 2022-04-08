import React from 'react';

const Connector = ({ bandWidth, xScale, yScale, data, direction }) => {
  const y = yScale(data.field);
  const x = xScale(data.accValue);
  return (
    <line
      x1={x}
      x2={x}
      y1={
        direction !== 'reverse'
          ? y + (bandWidth * 2) / 3 + 5
          : y + (bandWidth * 1) / 3 - 5
      }
      y2={
        direction !== 'reverse'
          ? y + (bandWidth * 4) / 3 - 5
          : y - (bandWidth * 1) / 3 + 5
      }
      fill="blue"
      stroke="grey"
      strokeDasharray={3}
    />
  );
};

export default Connector;
