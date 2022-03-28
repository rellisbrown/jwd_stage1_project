import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import useChartObject from '../../utils/qlik/useChartObject';
import SortIcon from '../../assets/icons/SortIcon';

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
  padding: 0rem 0rem 1rem 0rem;
  border-radius: 6px;
`;

const StyledTable = styled.table`
  border-spacing: 0px;
`;

const StyledTableHeader = styled.thead`
  position: sticky;
  top: 0;
  background-color: #142568;
  box-shadow: 1px 2px 3px 1px rgb(0 0 0 / 20%);
`;

const StyledTableRow = styled.tr`
  background-color: ${(props) =>
    props.index % 2 === 0 ? '#eaeaea6e' : 'white'};
  transition: all 0.05s ease-in-out;
  :hover {
    background-color: #c9d5e7;
  }
`;

const StyledTableHeaderCell = styled.th`
  padding: 0.5rem 1rem 0.5rem 1rem;
  color: white;
  cursor: pointer;
  /* display: flex; */
`;

const StyledTableCell = styled.td`
  padding: 0.5rem 1rem 0.5rem 1rem;
  text-align: right;
  color: #3d3d4a;
`;

const StyledSortIcon = styled(SortIcon)`
  display: flex;
  margin: auto 0rem auto 0.5rem;
  transition: all 0.2s ease-in-out;
  transform: ${(props) =>
    props.direction === 'asc' ? 'rotateX(180deg)' : 'rotateX(0deg)'};

  opacity: ${(props) => (props.sortStatus ? 1 : 0)};
  svg {
    width: 16px;
    fill: white;
  }
`;

const SalesRepTable = ({ doc, objectId }) => {
  const [chartObject, setChartObject] = useState();
  /* const [chartLayout, setChartLayout] = useState(); */
  const [chartHCData, setChartHCData] = useState([]);

  const qPages = useMemo(
    () => [
      {
        qLeft: 0,
        qTop: 0,
        qWidth: 1,
        qHeight: 101,
      },
      {
        qLeft: 1,
        qTop: 0,
        qWidth: 1,
        qHeight: 101,
      },
      {
        qLeft: 2,
        qTop: 0,
        qWidth: 1,
        qHeight: 101,
      },
      {
        qLeft: 3,
        qTop: 0,
        qWidth: 1,
        qHeight: 101,
      },
      {
        qLeft: 4,
        qTop: 0,
        qWidth: 1,
        qHeight: 101,
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
      name: item[0].qText,
      nameQState: item[0].qState,
    }));

    for (let i = 0; i < chartMatrix[1].length; i += 1) {
      chartData[i].quarter = chartMatrix[1][i][0].qText;
      chartData[i].quarterQState = chartMatrix[1][i][0].qState;
    }
    for (let i = 0; i < chartMatrix[2].length; i += 1) {
      chartData[i].salesNum = chartMatrix[2][i][0].qNum;
    }
    for (let i = 0; i < chartMatrix[3].length; i += 1) {
      chartData[i].revenue = chartMatrix[3][i][0].qNum;
    }
    for (let i = 0; i < chartMatrix[4].length; i += 1) {
      chartData[i].grossProfit = chartMatrix[4][i][0].qNum;
    }
  }

  const helper = {};
  const chartDataSum = chartData
    .reduce((acc, object) => {
      const key = object.name;
      if (!helper[key]) {
        helper[key] = {
          name: object.name,
          salesNum: object.salesNum,
          revenue: object.revenue,
          grossProfit: object.grossProfit,
        };
        acc.push(helper[key]);
      } else {
        helper[key].salesNum += object.salesNum;
        helper[key].revenue += object.revenue;
        helper[key].grossProfit += object.grossProfit;
      }

      return acc;
    }, [])
    .filter((item) => item.name !== '-'); // need to manually include total figures below, as they are not present when a selection is made

  let totalSalesNum = 0;
  for (const item of chartDataSum) {
    totalSalesNum += item.salesNum;
  }

  let totalRevenue = 0;
  for (const item of chartDataSum) {
    totalRevenue += item.revenue;
  }
  let totalGrossProfit = 0;
  for (const item of chartDataSum) {
    totalGrossProfit += item.grossProfit;
  }

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
          console.log(b.salesNum - a.salesNum);
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
        <StyledTableHeader>
          <tr>
            <StyledTableHeaderCell
              onClick={() => handleSortClick('name')}
              style={{ textAlign: 'left' }}
            >
              <div style={{ display: 'flex' }}>
                <span>Sales Rep Name</span>
                <StyledSortIcon
                  sortStatus={getSortStatus('name')}
                  direction={sort.direction}
                  className="className"
                />
              </div>
            </StyledTableHeaderCell>
            <StyledTableHeaderCell
              onClick={() => handleSortClick('revenue')}
              style={{ paddingLeft: '2rem', paddingRight: '0rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <span>Total Revenue (£)</span>
                <StyledSortIcon
                  sortStatus={getSortStatus('revenue')}
                  direction={sort.direction}
                  className="className"
                />
              </div>
            </StyledTableHeaderCell>
            <StyledTableHeaderCell
              onClick={() => handleSortClick('salesNum')}
              style={{ paddingLeft: '2rem', width: '130px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <span>Total Number of Sales</span>
                <StyledSortIcon
                  sortStatus={getSortStatus('salesNum')}
                  direction={sort.direction}
                  className="className"
                />
              </div>
            </StyledTableHeaderCell>
            <StyledTableHeaderCell
              onClick={() => handleSortClick('grossProfit')}
            >
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <span>Margin (£)</span>
                <StyledSortIcon
                  sortStatus={getSortStatus('grossProfit')}
                  direction={sort.direction}
                  className="className"
                />
              </div>
            </StyledTableHeaderCell>
          </tr>
        </StyledTableHeader>
        <tbody>
          {chartDataSum
            .sort(compare)

            .map((item, index) => (
              <StyledTableRow key={item.name} index={index}>
                <StyledTableCell
                  style={{
                    textAlign: 'left',
                    backgroundColor: '#eaeaea',
                    color: 'black',
                    fontSize: '1rem',
                    fontWeight: 600,
                  }}
                >
                  {item.name}
                </StyledTableCell>
                <StyledTableCell style={{ paddingRight: '2rem' }}>
                  {Number(item.revenue.toFixed(2)).toLocaleString('en-UK', {
                    minimumFractionDigits: 2,
                  })}
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    textAlign: 'center',
                    paddingLeft: '2rem',
                    paddingRight: '2rem',
                  }}
                >
                  {item.salesNum.toLocaleString('en-UK')}
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    paddingRight: '1.5rem',
                  }}
                >
                  {Number(item.grossProfit.toFixed(2)).toLocaleString('en-UK', {
                    minimumFractionDigits: 2,
                  })}
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </tbody>
        <tfoot>
          <StyledTableRow style={{ backgroundColor: '#bb2b2b' }}>
            <StyledTableCell
              style={{
                textAlign: 'left',
                backgroundColor: '#991010',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 600,
              }}
            >
              Total:
            </StyledTableCell>
            <StyledTableCell style={{ color: 'white', fontWeight: 600 }}>
              {Number(totalRevenue.toFixed(2)).toLocaleString('en-UK', {
                minimumFractionDigits: 2,
              })}
            </StyledTableCell>
            <StyledTableCell
              style={{
                textAlign: 'center',
                paddingLeft: '2rem',
                color: 'white',
                fontWeight: 600,
              }}
            >
              {totalSalesNum.toLocaleString('en-UK')}
            </StyledTableCell>
            <StyledTableCell style={{ color: 'white', fontWeight: 600 }}>
              {Number(totalGrossProfit.toFixed(2)).toLocaleString('en-UK', {
                minimumFractionDigits: 2,
              })}
            </StyledTableCell>
          </StyledTableRow>
        </tfoot>
      </StyledTable>
    </StyledTableContainer>
  );
};

export default SalesRepTable;