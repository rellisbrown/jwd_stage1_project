import styled from 'styled-components';

const StyledTableFooter = styled.tfoot`
  position: sticky;
  bottom: 0px;
  box-shadow: -1px -1px 3px 1px rgb(0 0 0 / 20%);
`;

const StyledTableRow = styled.tr`
  background-color: #bb2b2b;
`;

const StyledFooterTableCell = styled.td`
  padding: 0.5rem 1rem 0.5rem 1rem;
  text-align: right;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  @media (max-width: 600px) {
    font-size: 0.6rem;
    padding: 0.3rem 0.5rem 0.3rem 0.5rem;
  }
`;

const StyledTableCellTotal = styled(StyledFooterTableCell)`
  text-align: left;
  background-color: #991010;
  font-size: 0.9rem;
  @media (max-width: 600px) {
    font-size: 0.7rem;
  }
`;

const StyledTableCellRevenue = styled(StyledFooterTableCell)`
  padding-right: 2rem;
  @media (max-width: 600px) {
    padding-right: 1rem;
  }
`;

const StyledTableCellSales = styled(StyledFooterTableCell)`
  padding-right: 2.5rem;
  padding-left: 2rem;
  text-align: center;
  @media (max-width: 600px) {
    padding-right: 1.25rem;
    padding-left: 1rem;
  }
`;

const StyledTableCellMargin = styled(StyledFooterTableCell)`
  padding-right: 1.5rem;
  @media (max-width: 600px) {
    padding-right: 0.75rem;
  }
`;

const SalesRepTableFooter = ({
  totalRevenue,
  totalSalesNum,
  totalGrossProfit,
}) => (
  <StyledTableFooter>
    <StyledTableRow>
      <StyledTableCellTotal>Total</StyledTableCellTotal>
      <StyledTableCellRevenue>
        {Number(totalRevenue.toFixed(2)).toLocaleString('en-UK', {
          minimumFractionDigits: 2,
        })}
      </StyledTableCellRevenue>
      <StyledTableCellSales>
        {totalSalesNum.toLocaleString('en-UK')}
      </StyledTableCellSales>
      <StyledTableCellMargin>
        {Number(totalGrossProfit.toFixed(2)).toLocaleString('en-UK', {
          minimumFractionDigits: 2,
        })}
      </StyledTableCellMargin>
    </StyledTableRow>
  </StyledTableFooter>
);

export default SalesRepTableFooter;
