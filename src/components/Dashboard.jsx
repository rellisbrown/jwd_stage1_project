import React, { useState } from 'react';
import styled from 'styled-components';
import KPIChartSimple from './KPIChart/KPIChartSimple';
import KPIChartProfit from './KPIChart/KPIChartProfit';
import SalesRepTable from './SalesRepTable/SalesRepTable';
import WaterfallChart from './WaterfallChart/WaterFallChart';
import FilterDropdown from './FilterDropdown/FilterDropdown';
import chartParameters from '../data/chartParameters';
import { QlikContextProvider } from '../utils/qlik/qlikContext';

const StyledDashboardContainer = styled.div`
  display: flex;
  justify-items: center;
  flex-direction: column;
  margin: 1rem;
`;

const StyledKPIDiv = styled.div`
  display: grid;
  flex-direction: row;
  padding: 2rem 2rem auto 2rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-auto-rows: 130px;
  margin: auto 15% auto 15%;
`;

const StyledChartDiv = styled.div`
  margin: auto 10% auto 10%;
  display: grid;
  flex-direction: row;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  column-gap: 2rem;
  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fit, minmax(325px, 1fr));
  }
`;

const Dashboard = () => {
  const waterFallChartVariants = ['Quarters', 'Profit Analysis'];

  const [variantChecked, setVariantChecked] = useState(false); // could have utilised useContext to handle this state variable, but seemed like a simple enough case with relatively little prop drilling to be worth while...
  const waterfallVariantParameters = variantChecked
    ? chartParameters.waterfallCharts[1]
    : chartParameters.waterfallCharts[0];

  return (
    <QlikContextProvider>
      <StyledDashboardContainer>
        <StyledKPIDiv>
          {chartParameters.KPICharts.map(
            (chart, index) =>
              chart.type !== 'profit' ? (
                <KPIChartSimple
                  key={chart.title}
                  objectId={chart.objectId}
                  chartTitle={chart.title}
                  qPages={chart.qPages}
                  index={index}
                />
              ) : (
                <KPIChartProfit
                  key={chart.title}
                  objectId={chart.objectId}
                  chartTitle={chart.title}
                  qPages={chart.qPages}
                  index={index}
                />
              )
            // eslint-disable-next-line
          )}
          <FilterDropdown
            objectId={chartParameters.salesRepTable.objectId}
            selectionFieldName={chartParameters.fields.salesRep}
          />
        </StyledKPIDiv>
        <StyledChartDiv>
          <SalesRepTable
            objectId={chartParameters.salesRepTable.objectId}
            qPages={chartParameters.salesRepTable.qPages}
          />
          <WaterfallChart
            objectId={waterfallVariantParameters.objectId}
            title={waterfallVariantParameters.title}
            qPages={waterfallVariantParameters.qPages}
            fieldNames={waterfallVariantParameters.fieldNames}
            type={waterfallVariantParameters.type}
            direction={waterfallVariantParameters.direction}
            indexField={waterfallVariantParameters.indexField}
            variants={waterFallChartVariants}
            variantChecked={variantChecked}
            setVariantChecked={setVariantChecked}
          />
        </StyledChartDiv>
      </StyledDashboardContainer>
    </QlikContextProvider>
  );
};

export default Dashboard;
