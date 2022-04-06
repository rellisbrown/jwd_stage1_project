import React from 'react';
import styled from 'styled-components';

const StyledTableRow = styled.tr`
  background-color: ${(props) =>
    props.index % 2 === 0 ? '#eaeaea6e' : 'white'};
  transition: all 0.05s ease-in-out;
  :hover {
    background-color: #c9d5e7;
  }
`;

const StyledTableCell = styled.td`
  padding: 0.5rem 1rem 0.5rem 1rem;
  text-align: right;
  color: #3d3d4a;
  font-size: 0.8rem;
  @media (max-width: 600px) {
    font-size: 0.6rem;
    padding: 0.3rem 0.5rem 0.3rem 0.5rem;
  }
`;

const StyledTableCellName = styled(StyledTableCell)`
  text-align: left;
  background-color: #eaeaea;
  color: black;
  font-weight: 600;
`;

const StyledTableCellRevenue = styled(StyledTableCell)`
  padding-right: 2rem;
  @media (max-width: 600px) {
    padding-right: 1rem;
  }
`;

const StyledTableCellSales = styled(StyledTableCell)`
  padding-right: 2.5rem;
  padding-left: 2rem;
  text-align: center;
  @media (max-width: 600px) {
    padding-right: 0.5rem;
    padding-left: 0rem;
  }
`;

const StyledTableCellMargin = styled(StyledTableCell)`
  padding-right: 1.5rem;

  @media (max-width: 600px) {
    padding-right: 0.75rem;
  }
`;

const SalesRepTableRow = ({ item, index }) => (
  <StyledTableRow index={index}>
    <StyledTableCellName>{item.name}</StyledTableCellName>
    <StyledTableCellRevenue>
      {Number(item.revenue.toFixed(2)).toLocaleString('en-UK', {
        minimumFractionDigits: 2,
      })}
    </StyledTableCellRevenue>
    <StyledTableCellSales>
      {item.salesNum.toLocaleString('en-UK')}
    </StyledTableCellSales>
    <StyledTableCellMargin>
      {Number(item.grossProfit.toFixed(2)).toLocaleString('en-UK', {
        minimumFractionDigits: 2,
      })}
    </StyledTableCellMargin>
  </StyledTableRow>
);

export default SalesRepTableRow;
