import React from 'react';

const Connector = ({ bandWidth, xScale, yScale, data }) => {
  const y = yScale(data.quarter);
  const x = xScale(data.accRevenue);
  return (
    <line
      /*  height={bandWidth / 3} */
      x1={x}
      x2={x}
      y1={y + (bandWidth * 2) / 3 + 5}
      y2={y + (bandWidth * 4) / 3 - 5}
      fill="blue"
      stroke="grey"
      strokeDasharray={3}
    />
  );
};

export default Connector;
