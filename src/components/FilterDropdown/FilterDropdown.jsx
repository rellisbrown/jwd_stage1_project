import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import useFieldObject from '../../utils/qlik/useFieldObject';
import useSessionObject from '../../utils/qlik/useSessionObject';
import useOutsideClick from '../../utils/useOutsideClick';
import SearchIcon from '../../assets/icons/SearchIcon';
import ChevronIcon from '../../assets/icons/ChevronIcon';
import ClearIcon from '../../assets/icons/ClearIcon';
import ClearSearchIcon from '../../assets/icons/ClearSearchIcon';

const StyledOuterContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: auto;
  @media (max-width: 1420px) {
    grid-column-end: span 3;
  }
  @media (max-width: 1076px) {
    grid-column-end: span 1;
  }
`;

const StyledSearchContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 6px;
  height: fit-content;
`;

const StyledDropdownContainer = styled.div`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  position: absolute;
  top: ${(props) => `${props.top + 10}px`};
  flex-direction: column;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
  border-radius: 6px;
  height: fit-content;
  max-height: 200px;
  z-index: 100;
  background-color: white;
  width: ${(props) => `${props.width}px`};
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
`;

const StyledLabelText = styled.h4`
  margin: 0rem auto 0.3rem auto;
`;

const StyledSearchInput = styled.input`
  height: 1.5rem;
  width: 200px;
  font-size: 1rem;
  :focus-visible {
    outline-color: #1971be;
  }
`;

const StyledListItem = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.background};
  border: ${(props) => `1px solid ${props.border}`};

  :hover {
    background-color: ${(props) => props.backgroundHover};
  }
  cursor: pointer;
`;

const StyledListItemText = styled.p`
  margin: 0.3rem auto 0.3rem 1rem;
  font-size: 1rem;
`;

const StyledSearchIcon = styled(SearchIcon)`
  position: absolute;
  width: 16px;
  height: 16px;
  top: 50%;
  right: 0.5rem;
  transform: translateY(-60%);
`;

const StyledChevronButton = styled.div`
  width: 30px;
  display: flex;
  margin: auto;
`;

const StyledChevronIcon = styled(ChevronIcon)`
  width: 16px;
  height: 16px;
  margin: 0.5rem auto auto auto;
  transition: all 0.3s ease;
  transform: ${(props) =>
    props.visible ? 'rotateX(180deg)' : 'rotateX(0deg)'};
  svg {
    fill: #3c71b8;
  }
  :hover {
    transform: ${(props) =>
      props.visible
        ? 'rotateX(180deg) scale(1.2)'
        : 'rotateX(0deg) scale(1.2)'};
  }
  cursor: pointer;
`;

const StyledClearButton = styled.div`
  top: 110%;
  right: 0.3rem;
  width: 24px;
  position: absolute;
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  cursor: pointer;
  svg {
    padding: 0.2rem;
    transition: all 0.2s ease;
    :hover {
      background-color: #ff000012;
      border-radius: 100%;
    }
  }
`;

const StyledClearIcon = styled(ClearIcon)`
  margin: auto;
  svg {
    width: 20px;
    height: 20px;
    fill: #bb2b2b;
  }
`;

const StyledClearSearchButton = styled.div`
  top: 50%;
  right: 1.9rem;
  transform: translateY(-45%);
  width: 24px;
  position: absolute;
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  cursor: pointer;

  svg {
    transition: all 0.2s ease;
    background-color: #8080802c;
    border-radius: 100%;
    :hover {
      background-color: #ff000012;
      border-radius: 100%;
    }
  }
`;

const StyledClearSearchIcon = styled(ClearSearchIcon)`
  svg {
    width: 24px;
    height: 24px;
    fill: red;
  }
`;

const FilterDropdown = ({ selectionFieldName }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearchInput = (e) => setSearchText(e.target.value);

  const fieldObject = useFieldObject(selectionFieldName);

  const { sessionObjectLayout } = useSessionObject(selectionFieldName);

  let salesRepList = [];
  if (sessionObjectLayout) {
    salesRepList = sessionObjectLayout.qListObject.qDataPages[0].qMatrix.map(
      (item) => item[0]
    );
  }

  const salesRepListFiltered = salesRepList.filter(
    (item) => item.qText.toLowerCase().includes(searchText.toLowerCase())
    // eslint-disable-next-line
  );

  const searchContainerRef = useRef();
  let dropdownContainerOffset = 0;
  let dropdownContainerWidth = 0;
  if (searchContainerRef.current) {
    dropdownContainerOffset =
      searchContainerRef.current.getBoundingClientRect().height;
    dropdownContainerWidth =
      searchContainerRef.current.getBoundingClientRect().width;
  }

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleSelection = async (qText) => {
    await fieldObject.toggleSelect({
      qMatch: qText,
      /*  qSoftLock: true,
      qExcludedValuesMode: 1, */
    });
  };

  const getBackgroundColor = (qState) => {
    switch (qState) {
      case 'O':
        return 'white';
      case 'S':
        return '#1cb962';
      default:
        return 'white';
    }
  };

  const getBackgroundHoverColor = (qState) => {
    switch (qState) {
      case 'O':
        return '#ebebee';
      case 'S':
        return '#06af52';
      default:
        return '#ebebee';
    }
  };

  const getBorderColor = (qState) => {
    switch (qState) {
      case 'O':
        return 'white';
      case 'S':
        return 'white';
      default:
        return 'white';
    }
  };

  const dropdownContainerRef = useRef();

  useOutsideClick(dropdownContainerRef, searchContainerRef, setDropdownVisible);

  const selectionCount = salesRepList.filter(
    (item) => item.qState === 'S'
  ).length;

  const handleClear = async () => {
    await fieldObject.clear({});
  };

  return (
    <StyledOuterContainer>
      <StyledSearchContainer ref={searchContainerRef}>
        <StyledLabelText>Sales Person</StyledLabelText>
        <div style={{ position: 'relative' }}>
          <StyledSearchIcon className="className" />
          <StyledClearSearchButton
            visible={searchText.length > 0}
            onClick={() => setSearchText('')}
          >
            <StyledClearSearchIcon />
          </StyledClearSearchButton>
          <StyledClearButton
            visible={selectionCount > 0}
            onClick={() => handleClear()}
          >
            <StyledClearIcon className="className" />
          </StyledClearButton>

          <StyledSearchInput
            onChange={handleSearchInput}
            value={searchText}
            type="text"
            onFocus={() => setDropdownVisible(true)}
          />
        </div>

        <StyledChevronButton
          role="button"
          onClick={() => setDropdownVisible(!dropdownVisible)}
        >
          <StyledChevronIcon visible={dropdownVisible} className="className" />
        </StyledChevronButton>
      </StyledSearchContainer>
      <StyledDropdownContainer
        ref={dropdownContainerRef}
        visible={dropdownVisible}
        top={dropdownContainerOffset}
        width={dropdownContainerWidth}
      >
        {salesRepListFiltered.map((item) => (
          <StyledListItem
            background={getBackgroundColor(item.qState)}
            backgroundHover={getBackgroundHoverColor(item.qState)}
            border={getBorderColor(item.qState)}
            onClick={() => handleSelection(item.qText)}
            key={item.qElemNumber}
          >
            <StyledListItemText>{item.qText}</StyledListItemText>
          </StyledListItem>
        ))}
      </StyledDropdownContainer>
    </StyledOuterContainer>
  );
};

export default FilterDropdown;
