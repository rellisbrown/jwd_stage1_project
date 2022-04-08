import React from 'react';
import styled from 'styled-components';
import Logo from '../assets/calibrate-logo-mini.svg';

const StyledNavigationContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100px;
  width: 100%;
  background-color: #d8f0f28c;
  box-shadow: 0px 1px 2px 0px #888888;
`;

const StyledHeaderText = styled.h2`
  margin: auto auto auto 1rem;
  color: #1d3a34;
`;

const StyledLogo = styled.img`
  margin: auto 0 auto auto;
  height: 70px;
`;

const Navigation = () => (
  <StyledNavigationContainer>
    <StyledLogo src={Logo} />
    <StyledHeaderText>JWD - Stage 1 Project</StyledHeaderText>
  </StyledNavigationContainer>
);

export default Navigation;
