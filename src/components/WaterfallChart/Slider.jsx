import React from 'react';
import styled from 'styled-components';

const StyledSlider = styled.label`
  position: relative;
  display: flex;
  width: 40px;
  height: 20px;
  margin: auto;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 20px;
  }
  span:before {
    position: absolute;
    content: '';
    height: 14px;
    width: 14px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
  input:checked + span {
    background-color: #2196f3;
  }

  input:focus + span {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + span:before {
    -webkit-transform: translateX(20px);
    -ms-transform: translateX(20px);
    transform: translateX(20px);
  }
`;

const StyledSliderContainer = styled.div`
  position: absolute;
  display: flex;
  top: 1rem;
  right: 3rem;
`;

const StyledSliderText = styled.h4`
  margin: auto 1rem;
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const Slider = ({ variants, variantChecked, setVariantChecked }) => (
  <StyledSliderContainer>
    <StyledSliderText>{variants[0]}</StyledSliderText>
    <StyledSlider>
      <input
        type="checkbox"
        checked={variantChecked}
        onChange={() => setVariantChecked(!variantChecked)}
      />
      <span />
    </StyledSlider>
    <StyledSliderText>{variants[1]}</StyledSliderText>
  </StyledSliderContainer>
);

export default Slider;
