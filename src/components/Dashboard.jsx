import React, { useState } from 'react';
import styled from 'styled-components';
import useQlik from '../utils/qlik/useQlik';
import qlikConfig from '../utils/qlik/qlikConfig';
import KPIChartSimple from './KPIChart/KPIChartSimple';
import KPIChartProfit from './KPIChart/KPIChartProfit';
import SalesRepTable from './SalesRepTable/SalesRepTable';
import WaterfallChart from './WaterfallChart/WaterFallChart';
import FilterDropdown from './FilterDropdown/FilterDropdown';
import chartParameters from '../data/chartParameters';

const StyledDashboardContainer = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const StyledKPIDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 2rem auto auto auto;
`;

const StyledChartDiv = styled.div`
  margin: auto;
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const Dashboard = () => {
  const [global, setGlobal] = useState(undefined);
  const [doc, setDoc] = useState(undefined);
  const [error, setError] = useState(undefined); // could be used for error handling when setting up the intial qlik connection

  useQlik(global, setGlobal, setDoc, setError, qlikConfig);

  const waterFallChartVariants = ['Quarters', 'Profit Analysis'];

  const [variantChecked, setVariantChecked] = useState(false); // could have utilised useContext to handle this state variable, but seemed like a simple enough case with relatively little prop drilling to be worth while...

  return (
    <StyledDashboardContainer>
      <StyledKPIDiv>
        <KPIChartSimple
          doc={doc}
          objectId={chartParameters.KPICharts[0].objectId}
          chartTitle={chartParameters.KPICharts[0].title}
          qPages={chartParameters.KPICharts[0].qPages}
        />
        <KPIChartSimple
          doc={doc}
          objectId={chartParameters.KPICharts[1].objectId}
          chartTitle={chartParameters.KPICharts[1].title}
          qPages={chartParameters.KPICharts[1].qPages}
        />

        <KPIChartProfit
          doc={doc}
          objectId={chartParameters.KPICharts[2].objectId}
          chartTitle={chartParameters.KPICharts[2].title}
          qPages={chartParameters.KPICharts[2].qPages}
        />
        <FilterDropdown
          doc={doc}
          objectId={chartParameters.salesRepTable.objectId}
          selectionFieldName={chartParameters.fields.salesRep}
        />
      </StyledKPIDiv>
      <StyledChartDiv>
        <SalesRepTable
          doc={doc}
          objectId={chartParameters.salesRepTable.objectId}
          qPages={chartParameters.salesRepTable.qPages}
        />
        <WaterfallChart
          doc={doc}
          objectId={
            variantChecked
              ? chartParameters.waterfallCharts[1].objectId
              : chartParameters.waterfallCharts[0].objectId
          }
          title={
            variantChecked
              ? chartParameters.waterfallCharts[1].title
              : chartParameters.waterfallCharts[0].title
          }
          qPages={
            variantChecked
              ? chartParameters.waterfallCharts[1].qPages
              : chartParameters.waterfallCharts[0].qPages
          }
          fieldNames={
            variantChecked
              ? chartParameters.waterfallCharts[1].fieldNames
              : chartParameters.waterfallCharts[0].fieldNames
          }
          type={
            variantChecked
              ? chartParameters.waterfallCharts[1].type
              : chartParameters.waterfallCharts[0].type
          }
          direction={
            variantChecked
              ? chartParameters.waterfallCharts[1].direction
              : chartParameters.waterfallCharts[0].direction
          }
          indexField={
            variantChecked
              ? chartParameters.waterfallCharts[1].indexField
              : chartParameters.waterfallCharts[0].indexField
          }
          variants={waterFallChartVariants}
          variantChecked={variantChecked}
          setVariantChecked={setVariantChecked}
        />
      </StyledChartDiv>
    </StyledDashboardContainer>
  );
};

export default Dashboard;
