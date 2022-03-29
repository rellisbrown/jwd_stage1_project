import React, { useState, useMemo, useRef } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import useChartObject from '../../utils/qlik/useChartObject';
import useResizeObserver from '../../utils/qlik/useResizeObserver';
import XAxis from './XAxis';
import YAxis from './YAxis';
import Bar from './Bar';
import Connector from './Connector';
import BarText from './BarText';
import Label from './Label';

const StyledChartContainer = styled.div`
  display: flex;
  margin: 2rem auto auto auto;
  height: 600px;
  width: 80%;
  position: relative;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
  padding: 0rem 0rem 1rem 0rem;
  border-radius: 6px;
`;

const WaterfallChart = ({ doc, objectId }) => {
  const [chartObject, setChartObject] = useState();
  /* const [chartLayout, setChartLayout] = useState(); */
  const [chartHCData, setChartHCData] = useState([]);

  const qPages = useMemo(
    () => [
      {
        qLeft: 0,
        qTop: 0,
        qWidth: 1,
        qHeight: 4,
      },
      {
        qLeft: 1,
        qTop: 0,
        qWidth: 1,
        qHeight: 4,
      },
    ],
    []
  );

  useChartObject({
    doc,
    objectId,
    chartObject,
    qPages,
    setChartObject,
    /* setChartLayout, */
    setChartHCData,
  });

  const chartMatrix = chartHCData.map((item) => item.qMatrix);

  let chartData = [];

  if (chartMatrix[0]) {
    chartData = chartMatrix[0].map((item) => ({
      quarter: item[0].qText,
      qState: item[0].qState,
    }));

    for (let i = 0; i < chartMatrix[1].length; i += 1) {
      chartData[i].revenue = chartMatrix[1][i][0].qNum;
    }
  }

  let totalRevenue = 0;
  for (const item of chartData) {
    totalRevenue += item.revenue;
  }

  chartData.push({ quarter: 'Total', revenue: totalRevenue });

  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 75,
  };

  const innerHeightChart = dimensions?.height - margin.top - margin.bottom;
  const innerWidthChart = dimensions?.width - margin.left - margin.right;

  const xMinValue = 0;
  const xMaxValue = d3.max(chartData, (d) => d.revenue);
  const yValues = chartData.map((item) => item.quarter);

  const xLabel = 'Breakdown of Total Sales in Year by Quarter';

  const xScale = d3
    .scaleLinear()
    .domain([xMinValue, xMaxValue])
    .range([0, innerWidthChart - innerWidthChart / 15]); // slight offset to leave some additonal space on the right edge
  const bandWidth = innerHeightChart / yValues.length;

  const yRange = d3.range(0, yValues.length * bandWidth, bandWidth);

  const yScale = d3.scaleOrdinal().domain(yValues).range(yRange);

  const yTickFormat = (d) => d;

  const chartDataCumulative = [];
  let accumulator = 0;
  for (let i = 0; i < chartData.length - 1; i += 1) {
    accumulator += chartData[i].revenue;
    chartDataCumulative[i] = {
      quarter: chartData[i].quarter,
      revenue: chartData[i].revenue,
      accRevenue: accumulator,
    };
  }

  const fillColors = {
    backdrop: '#eaf7f8',
    revenue: 'url(#revGrad)',
    revenueTotal: 'url(#revGradTotal)',
    revenueStroke: '#36701e',
    revenueTotalStroke: '#0a1976',
  };

  return (
    <StyledChartContainer ref={wrapperRef}>
      {dimensions ? (
        <>
          <svg style={{ width: '100%' }}>
            <defs>
              <linearGradient id="revGrad" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop
                  offset="25%"
                  stopColor="rgb(60,184,80)"
                  stopOpacity="1.00"
                />
                <stop
                  offset="50%"
                  stopColor="rgb(58,171,56)"
                  stopOpacity="1.00"
                />
                <stop
                  offset="75%"
                  stopColor="rgb(46,164,94)"
                  stopOpacity="1.00"
                />
              </linearGradient>
              <linearGradient
                id="revGradTotal"
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
              >
                <stop
                  offset="25%"
                  stopColor="rgb(60,114,184)"
                  stopOpacity="1.00"
                />
                <stop
                  offset="50%"
                  stopColor="rgb(56,57,171)"
                  stopOpacity="1.00"
                />
                <stop
                  offset="75%"
                  stopColor="rgb(53,46,164)"
                  stopOpacity="1.00"
                />
              </linearGradient>
            </defs>
            <rect
              transform={`translate(${margin.left}, ${margin.top})`}
              width={innerWidthChart}
              height={innerHeightChart}
              fill={fillColors.backdrop}
            />
            <XAxis dimensions={dimensions} margin={margin} />
            <YAxis
              scale={yScale}
              dimensions={dimensions}
              margin={margin}
              tickFormat={yTickFormat}
              yValues={yValues}
              bandWidth={bandWidth}
            />
            <g transform={`translate(${margin.left}, ${margin.top})`}>
              {chartDataCumulative.map((item) => (
                <>
                  <Bar
                    key={`Bar-${item.quarter}-${item.revenue}`}
                    bandWidth={bandWidth}
                    xScale={xScale}
                    yScale={yScale}
                    data={item}
                    fill={fillColors.revenue}
                    stroke={fillColors.revenueStroke}
                  />
                  <Connector
                    key={`Connector-${item.quarter}-${item.revenue}`}
                    bandWidth={bandWidth}
                    xScale={xScale}
                    yScale={yScale}
                    data={item}
                  />
                </>
              ))}
              <Bar
                key={`Bar-Total-${totalRevenue}`}
                bandWidth={bandWidth}
                xScale={xScale}
                yScale={yScale}
                data={{
                  quarter: 'Total',
                  accRevenue: totalRevenue,
                  revenue: totalRevenue,
                }}
                fill={fillColors.revenueTotal}
                stroke={fillColors.revenueTotalStroke}
              />
            </g>
          </svg>
        </>
      ) : (
        <></>
      )}
      {chartDataCumulative.map((item) => (
        <BarText
          key={`Text-${item.quarter}-${item.revenue}`}
          bandWidth={bandWidth}
          xScale={xScale}
          yScale={yScale}
          data={item}
          margin={margin}
        />
      ))}
      <BarText
        key={`Text-Total-${totalRevenue}`}
        bandWidth={bandWidth}
        xScale={xScale}
        yScale={yScale}
        data={{
          quarter: 'Total',
          accRevenue: totalRevenue,
          revenue: totalRevenue,
        }}
        margin={margin}
      />
      <Label
        margin={margin}
        innerHeight={innerHeightChart}
        innerWidth={innerWidthChart}
        text={xLabel}
      />
    </StyledChartContainer>
  );
};

export default WaterfallChart;
