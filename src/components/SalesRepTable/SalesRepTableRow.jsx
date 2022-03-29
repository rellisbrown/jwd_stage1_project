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
`;

const SalesRepTableRow = ({ item, index }) => (
  <StyledTableRow index={index}>
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
        paddingRight: '2.5rem',
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
);

export default SalesRepTableRow;
