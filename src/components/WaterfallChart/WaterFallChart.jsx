import React, { useMemo, useRef } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import useChartObject from '../../utils/qlik/useChartObject';
import useResizeObserver from '../../utils/useResizeObserver';
import XAxis from './XAxis';
import YAxis from './YAxis';
import Bar from './Bar';
import Connector from './Connector';
import BarText from './BarText';
import Label from './Label';
import Slider from './Slider';
import WaterfallChartSvgDefs from './WaterfallChartSvgDefs';
import { useWaterfallChartData } from '../../utils/dataTransformations';

const StyledChartContainer = styled.div`
  display: flex;
  margin: 2rem auto auto auto;
  height: 500px;
  width: 100%;
  position: relative;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
  padding: 0rem 0rem 1rem 0rem;
  border-radius: 6px;
  @media (max-width: 600px) {
    height: 400px;
  }
`;

const WaterfallChart = ({
  objectId,
  title,
  qPages,
  fieldNames,
  type,
  direction,
  indexField,
  variants,
  variantChecked,
  setVariantChecked,
}) => {
  const qPagesArray = useMemo(() => qPages, [qPages]);
  const { chartHCData } = useChartObject({
    objectId,
    qPagesArray,
  });

  // Need to get Total Revenue and Total Expenses from Task 1.3 chart to make the expenses and profit figures in the Waterfall chart as consistent as possible with other data, hence the code below:
  // Props werent passed into the component due to the temporary nature of the solution

  const qPagesArrayRevExp = useMemo(
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
      {
        qLeft: 2,
        qTop: 0,
        qWidth: 1,
        qHeight: 4,
      },
      {
        qLeft: 3,
        qTop: 0,
        qWidth: 1,
        qHeight: 4,
      },
    ],
    []
  );

  const revExpObjectId = 'xWWjCN';

  const { chartHCData: chartRevExpHCData } = useChartObject({
    objectId: revExpObjectId,
    qPagesArray: qPagesArrayRevExp,
  });

  const chartMatrixRevExp = chartRevExpHCData.map((item) => item.qMatrix);

  let totalRevenue = 0;
  if (chartMatrixRevExp[1]) {
    for (const item of chartMatrixRevExp[1]) {
      totalRevenue += item[0].qNum;
    }
  }

  let totalExpenses = 0;
  if (chartMatrixRevExp[2]) {
    for (const item of chartMatrixRevExp[2]) {
      totalExpenses += item[0].qNum;
    }
  }

  //

  const chartMatrix = chartHCData.map((item) => item.qMatrix);

  const { chartData, totalValue, chartDataCumulative } = useWaterfallChartData(
    chartMatrix,
    indexField,
    fieldNames,
    type,
    direction,
    totalRevenue,
    totalExpenses // did not include total revenue and expenses calculations within hook, as this is a temporary fix related to data issues...
  );

  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 75,
  };

  if (type === 'ProfitAnalysis') {
    margin.left = 100;
  }

  const innerHeightChart = dimensions?.height - margin.top - margin.bottom;
  const innerWidthChart = dimensions?.width - margin.left - margin.right;

  const xMinValue = 0;
  const xMaxValue = d3.max(chartData, (d) => d.value);
  const yValues = chartData.map((item) => item.field);

  const xLabel = title;

  const xScale = d3
    .scaleLinear()
    .domain([xMinValue, xMaxValue])
    .range([0, innerWidthChart - innerWidthChart / 15]); // slight offset to leave some additonal space on the right edge
  const bandWidth = innerHeightChart / yValues.length;

  const yRange = d3.range(0, yValues.length * bandWidth, bandWidth);

  const yScale = d3.scaleOrdinal().domain(yValues).range(yRange);

  const yTickFormat = (d) => d;

  const fillColors = {
    backdrop: '#eaf7f8',
    value: 'url(#revGrad)',
    valueTotal: 'url(#revGradTotal)',
    valueStroke: '#36701e',
    valueTotalStroke: '#0a1976',
    cost: 'url(#revGradCosts)',
    costStroke: '#e27f7f',
  };

  const getFill = (index) => {
    if (type !== 'ProfitAnalysis') {
      return fillColors.value;
    }
    if (index === chartDataCumulative.length - 1) {
      return fillColors.value;
    }
    return fillColors.cost;
  };

  const getStroke = (index) => {
    if (type !== 'ProfitAnalysis') {
      return fillColors.valueStroke;
    }
    if (index === chartDataCumulative.length - 1) {
      return fillColors.valueStroke;
    }
    return fillColors.costStroke;
  };

  return (
    <StyledChartContainer ref={wrapperRef}>
      {totalValue ? (
        <>
          {dimensions ? (
            <>
              <svg style={{ width: '100%' }}>
                <WaterfallChartSvgDefs />
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
                  {chartDataCumulative.map((item, index) => (
                    <>
                      <Bar
                        key={`Bar-${item.field}`}
                        bandWidth={bandWidth}
                        xScale={xScale}
                        yScale={yScale}
                        data={item}
                        fill={getFill(index)}
                        stroke={getStroke(index)}
                      />
                      <Connector
                        key={`Connector-${item.field}`}
                        bandWidth={bandWidth}
                        xScale={xScale}
                        yScale={yScale}
                        data={item}
                        direction={direction}
                      />
                    </>
                  ))}
                  <Bar
                    key="Bar-Total"
                    bandWidth={bandWidth}
                    xScale={xScale}
                    yScale={yScale}
                    data={{
                      field: 'Total',
                      accValue: totalValue,
                      value: totalValue,
                    }}
                    fill={fillColors.valueTotal}
                    stroke={fillColors.valueTotalStroke}
                  />
                </g>
              </svg>
            </>
          ) : (
            <></>
          )}
          {chartDataCumulative.map((item) => (
            <BarText
              key={`Text-${item.field}`}
              bandWidth={bandWidth}
              xScale={xScale}
              yScale={yScale}
              data={item}
              margin={margin}
            />
          ))}
          <BarText
            key="Text-Total"
            bandWidth={bandWidth}
            xScale={xScale}
            yScale={yScale}
            data={{
              field: 'Total',
              accValue: totalValue,
              value: totalValue,
            }}
            margin={margin}
          />
          <Label
            margin={margin}
            innerHeight={innerHeightChart}
            innerWidth={innerWidthChart}
            text={xLabel}
          />
          <Slider
            variants={variants}
            variantChecked={variantChecked}
            setVariantChecked={setVariantChecked}
          />
        </>
      ) : (
        <div style={{ margin: 'auto' }}>
          ...loading (please ensure that the appropriate Qlik App is open and
          refresh the page)
        </div>
      )}
    </StyledChartContainer>
  );
};

export default WaterfallChart;
