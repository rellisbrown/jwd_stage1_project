import styled from 'styled-components';
import SortIcon from '../../assets/icons/SortIcon';

const StyledTableHeader = styled.thead`
  position: sticky;
  top: 0;
  background-color: #142568;
  box-shadow: 1px 2px 3px 1px rgb(0 0 0 / 20%);
`;

const StyledTableHeaderCell = styled.th`
  padding: 0.5rem 0rem 0.5rem 1rem;
  color: white;
  cursor: pointer;
  font-size: 0.8rem;
  @media (max-width: 600px) {
    font-size: 0.6rem;
    padding: 0.3rem 0.5rem 0.3rem 0.5rem;
  }
`;

const StyledTableHeaderCellName = styled(StyledTableHeaderCell)`
  text-align: center;
`;

const StyledTableHeaderCellRevenue = styled(StyledTableHeaderCell)`
  padding-left: 1rem;
  padding-right: 0rem;
  @media (max-width: 600px) {
    padding-left: 0.5rem;
  }
`;

const StyledTableHeaderCellSales = styled(StyledTableHeaderCell)`
  padding-left: 1rem;
  width: 130px;
  @media (max-width: 600px) {
    padding-left: 0.5rem;
    padding-right: 0rem;
    width: 100px;
  }
`;

const StyledTableHeaderCellMargin = styled(StyledTableHeaderCell)`
  padding-right: 1rem;
  @media (max-width: 600px) {
    padding-right: 0.25rem;
  }
`;

const StyledTableHeaderCellInnerContainer = styled.div`
  display: flex;
  justify-content: flex-end;
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

const SalesRepTableHeader = ({ sort, handleSortClick, getSortStatus }) => (
  <StyledTableHeader>
    <tr>
      <StyledTableHeaderCellName onClick={() => handleSortClick('name')}>
        <StyledTableHeaderCellInnerContainer
          style={{ justifyContent: 'flex-start' }}
        >
          <span>Sales Rep Name</span>
          <StyledSortIcon
            sortStatus={getSortStatus('name')}
            direction={sort.direction}
            className="className"
          />
        </StyledTableHeaderCellInnerContainer>
      </StyledTableHeaderCellName>
      <StyledTableHeaderCellRevenue onClick={() => handleSortClick('revenue')}>
        <StyledTableHeaderCellInnerContainer>
          <span>Total Revenue (£)</span>
          <StyledSortIcon
            sortStatus={getSortStatus('revenue')}
            direction={sort.direction}
            className="className"
          />
        </StyledTableHeaderCellInnerContainer>
      </StyledTableHeaderCellRevenue>
      <StyledTableHeaderCellSales onClick={() => handleSortClick('salesNum')}>
        <StyledTableHeaderCellInnerContainer>
          <span>Total Number of Sales</span>
          <StyledSortIcon
            sortStatus={getSortStatus('salesNum')}
            direction={sort.direction}
            className="className"
          />
        </StyledTableHeaderCellInnerContainer>
      </StyledTableHeaderCellSales>
      <StyledTableHeaderCellMargin
        onClick={() => handleSortClick('grossProfit')}
      >
        <StyledTableHeaderCellInnerContainer>
          <span>Margin (£)</span>
          <StyledSortIcon
            sortStatus={getSortStatus('grossProfit')}
            direction={sort.direction}
            className="className"
          />
        </StyledTableHeaderCellInnerContainer>
      </StyledTableHeaderCellMargin>
    </tr>
  </StyledTableHeader>
);

export default SalesRepTableHeader;
