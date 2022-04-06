import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import useChartObject from '../../utils/qlik/useChartObject';
import SalesRepTableRow from './SalesRepTableRow';
import SalesRepTableHeader from './SalesRepTableHeader';
import SalesRepTableFooter from './SalesRepTableFooter';
import { useTableData } from '../../utils/dataTransformations';

const StyledTableContainer = styled.div`
  display: flex;
  margin: 2rem auto auto auto;
  max-height: 500px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 20px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d6dee1;
    border-radius: 20px;
    border: 6px solid transparent;
    background-clip: content-box;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #a8bbbf;
  }
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
  padding: 0rem 0rem 0rem 0rem;
  border-radius: 6px;
`;

const StyledTable = styled.table`
  border-spacing: 0px;
  width: 100%;
`;

const SalesRepTable = ({ objectId, qPages }) => {
  const qPagesArray = useMemo(() => qPages, [qPages]);

  const { chartHCData } = useChartObject({
    objectId,
    qPagesArray,
  });

  const chartMatrix = chartHCData.map((item) => item.qMatrix);

  const { chartDataSum, totalSalesNum, totalRevenue, totalGrossProfit } =
    useTableData(chartMatrix);

  const [sort, setSort] = useState({ field: 'name', direction: 'desc' });

  const compare = (a, b) => {
    switch (sort.field) {
      case 'name':
        if (sort.direction === 'asc') {
          return b.name.localeCompare(a.name);
        }
        return a.name.localeCompare(b.name);

      case 'salesNum':
        if (sort.direction === 'asc') {
          return b.salesNum - a.salesNum;
        }
        return a.salesNum - b.salesNum;

      case 'revenue':
        if (sort.direction === 'asc') {
          return b.revenue - a.revenue;
        }
        return a.revenue - b.revenue;

      case 'grossProfit':
        if (sort.direction === 'asc') {
          return b.grossProfit - a.grossProfit;
        }
        return a.grossProfit - b.grossProfit;

      default:
        return a.name - b.name;
    }
  };

  const handleSortClick = (field) => {
    if (field === sort.field) {
      if (sort.direction === 'desc') {
        setSort({ ...sort, direction: 'asc' });
      } else setSort({ ...sort, direction: 'desc' });
    } else setSort({ field, direction: 'desc' });
  };

  const getSortStatus = (column) => {
    if (column === sort.field) {
      return true;
    }
    return false;
  };

  return (
    <StyledTableContainer>
      <StyledTable>
        <SalesRepTableHeader
          sort={sort}
          handleSortClick={handleSortClick}
          getSortStatus={getSortStatus}
        />
        <tbody>
          {chartDataSum.sort(compare).map((item, index) => (
            <SalesRepTableRow key={item.name} item={item} index={index} />
          ))}
        </tbody>
        <SalesRepTableFooter
          totalRevenue={totalRevenue}
          totalSalesNum={totalSalesNum}
          totalGrossProfit={totalGrossProfit}
        />
      </StyledTable>
    </StyledTableContainer>
  );
};

export default SalesRepTable;
