import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import useChartObject from '../../utils/qlik/useChartObject';
import TriangleIcon from '../../assets/icons/TriangleIcon';

const StyledChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.7rem;
  width: 120px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
  margin: auto 0rem auto auto;
`;

const StyledChartTitle = styled.h4`
  margin: auto auto 0.3rem auto;
`;

const StyledValueText = styled.p`
  margin: auto auto 0.2rem auto;
  font-size: 1rem;
  font-weight: 600;
  color: black;
`;

const StyledChangeDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  margin: auto;
`;

const StyledTriangleIcon = styled(TriangleIcon)`
  margin: auto 0.5rem auto auto;
  opacity: ${(props) => (props.color === 'grey' ? 0 : 1)};
  svg {
    height: 10px;
    fill: ${(props) => props.color};
    transform: ${(props) =>
      props.color === '#ff0000'
        ? 'rotate(180deg) translateY(0.5px)'
        : 'rotate(0deg) translateY(-1px)'};
  }
`;

const StyledChangeText = styled.p`
  margin: auto auto auto 0;
  font-size: 0.9rem;
  color: ${(props) => props.color};
`;

const KPIChartProfit = ({ doc, objectId, chartTitle, qPages }) => {
  const [chartObject, setChartObject] = useState();
  const [chartHCData, setChartHCData] = useState([]);

  const qPagesArray = useMemo(() => qPages, [qPages]);

  useChartObject({
    doc,
    objectId,
    chartObject,
    qPagesArray,
    setChartObject,
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
    for (let i = 0; i < chartMatrix[2].length; i += 1) {
      chartData[i].expenses = chartMatrix[2][i][0].qNum;
    }
    for (let i = 0; i < chartData.length; i += 1) {
      chartData[i].profit = chartData[i].revenue - chartData[i].expenses;
    }
    for (let i = 0; i < chartData.length; i += 1) {
      chartData[i].changeNum = chartMatrix[3][i][0].qNum;
    }
    for (let i = 0; i < chartData.length; i += 1) {
      chartData[i].changeText = chartMatrix[3][i][0].qText;
    }
  }

  let profit = 0;

  for (let i = 0; i < chartData.length; i += 1) {
    profit += chartData[i].profit;
  }

  let changeNum = 0;
  let changeText = '';
  if (chartData[0]) {
    changeNum = chartData[0].changeNum;
    changeText = chartData[0].changeText; // the changeText here is already formatted to a 2 decimal place, % value, although this could also be acheived by: (changeNum * 100).toFixed(2)
  } // annual margin change is the same for all items in the selection

  const getChangeColor = () => {
    if (changeNum > 0) {
      return '#00b03c';
    }
    if (changeNum < 0) {
      return '#ff0000';
    }
    return 'grey';
  };

  return (
    <StyledChartContainer>
      <StyledChartTitle>{chartTitle}</StyledChartTitle>
      {profit ? (
        <StyledValueText>
          {Number((profit / 1000000).toFixed(0)).toLocaleString('en-UK')} m
        </StyledValueText>
      ) : (
        <StyledValueText>...</StyledValueText>
      )}
      {changeText ? (
        <StyledChangeDiv>
          <StyledTriangleIcon color={getChangeColor()} className="className" />
          <StyledChangeText color={getChangeColor()}>
            {changeText}
          </StyledChangeText>
        </StyledChangeDiv>
      ) : (
        <StyledValueText>...</StyledValueText>
      )}
    </StyledChartContainer>
  );
};
export default KPIChartProfit;
