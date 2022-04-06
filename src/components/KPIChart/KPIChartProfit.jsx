import React, { useMemo } from 'react';
import styled from 'styled-components';
import useChartObject from '../../utils/qlik/useChartObject';
import TriangleIcon from '../../assets/icons/TriangleIcon';
import { useKPIChartProfitData } from '../../utils/dataTransformations';

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
  margin: auto auto auto auto;
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

const KPIChartProfit = ({ objectId, chartTitle, qPages }) => {
  const qPagesArray = useMemo(() => qPages, [qPages]);

  const { chartHCData } = useChartObject({
    objectId,
    qPagesArray,
  });

  const chartMatrix = chartHCData.map((item) => item.qMatrix);

  const { profit, changeText, changeNum } = useKPIChartProfitData(chartMatrix);

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
