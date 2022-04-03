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

const KPIChartSimple = ({ doc, objectId, chartTitle, qPages }) => {
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

  // Decided to get Total Revenue and Total Expenses from Task 1.3 chart to make the expenses and profit figures as consistent as possible with other data, hence the code below:
  // Props werent passed into the component due to the temporary nature of the solution

  const [chartObjectRevExp, setChartObjectRevExp] = useState();

  const [chartRevExpHCData, setChartRevExpHCData] = useState([]);

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

  useChartObject({
    doc,
    objectId: revExpObjectId,
    chartObject: chartObjectRevExp,
    qPagesArray: qPagesArrayRevExp,
    setChartObject: setChartObjectRevExp,
    setChartHCData: setChartRevExpHCData,
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

  const chartData = chartHCData.map((item) => item.qMatrix[0][0]);

  const getChangeColor = () => {
    if (chartData[1]?.qNum > 0) {
      return '#00b03c';
    }
    if (chartData[1]?.qNum < 0) {
      return '#ff0000';
    }
    return 'grey';
  };

  let revenueExpense = 0;
  if (chartTitle === 'Total Revenue') {
    revenueExpense = totalRevenue;
  } else {
    revenueExpense = totalExpenses;
  }

  return (
    <StyledChartContainer>
      <StyledChartTitle>{chartTitle}</StyledChartTitle>
      {revenueExpense ? (
        <StyledValueText>
          {Number((revenueExpense / 1000000).toFixed(0)).toLocaleString(
            'en-UK'
          )}{' '}
          m
        </StyledValueText>
      ) : (
        <StyledValueText>...</StyledValueText>
      )}
      {chartData[1] ? ( // the change qText is already formatted to a 2 decimal place, % value, although this could also be acheived by: (chartData[1].qNum * 100).toFixed(2)
        <StyledChangeDiv>
          <StyledTriangleIcon color={getChangeColor()} className="className" />
          <StyledChangeText color={getChangeColor()}>
            {chartData[1].qText}
          </StyledChangeText>
        </StyledChangeDiv>
      ) : (
        <StyledValueText>...</StyledValueText>
      )}
    </StyledChartContainer>
  );
};
export default KPIChartSimple;
