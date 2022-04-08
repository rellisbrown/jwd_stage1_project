import React, { useState } from 'react';
import styled from 'styled-components';
import useQlik from '../utils/qlik/useQlik';
import qlikConfig from '../utils/qlik/qlikConfig';
import KPIChartSimple from './KPIChart/KPIChartSimple';
import KPIChartProfit from './KPIChart/KPIChartProfit';
import SalesRepTable from './SalesRepTable/SalesRepTable';

const StyledDashboardContainer = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const StyledKPIDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 60%;
  margin: 2rem auto auto auto;
`;

const Dashboard = () => {
  const [global, setGlobal] = useState(undefined);
  const [doc, setDoc] = useState(undefined);
  const [error, setError] = useState(undefined); // could be used for error handling when setting up the intial qlik connection

  useQlik(global, setGlobal, setDoc, setError, qlikConfig);

  const KPIChartsInfo = [
    {
      objectId: 'tWJJyZ',
      title: 'Total Revenue',
    },
    {
      objectId: 'eMsVVT',
      title: 'Total Expenses',
    },
    {
      objectId: 'xWWjCN',
      title: 'Total Profit',
    },
  ];

  const SalesRepTableInfo = {
    objectId: 'QJCCUM',
  };
  return (
    <StyledDashboardContainer>
      {/*  <StyledKPIDiv>
        <KPIChartSimple
          doc={doc}
          objectId={KPIChartsInfo[0].objectId}
          chartTitle={KPIChartsInfo[0].title}
        />
        <KPIChartSimple
          doc={doc}
          objectId={KPIChartsInfo[1].objectId}
          chartTitle={KPIChartsInfo[1].title}
        />

        <KPIChartProfit
          doc={doc}
          objectId={KPIChartsInfo[2].objectId}
          chartTitle={KPIChartsInfo[2].title}
        />
      </StyledKPIDiv> */}
      <SalesRepTable doc={doc} objectId={SalesRepTableInfo.objectId} />
    </StyledDashboardContainer>
  );
};

export default Dashboard;
