import React, { useState } from 'react';
import { Show } from '../../Services/types';
import { SliderHook } from '../utils/hooks';

import styled from "styled-components";
import { devices } from '../LandingPage/FAQ';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import Card from './Card';

const SliderContent = styled.div``;

const Slider = ({ filter, shows }: { filter: string; shows: Show[]; }) => {
  const [sliderArrow, setSliderArrow] = useState<Boolean>(true);
  const { ref, displayShows, showWidth, handleLeftClick, handleRightClick, sliderProps, isMoved } = SliderHook(shows);

  return (
    <RowContainer>
      <div>
        <h2>{filter}</h2>
      </div>
      <SliderContainer>
        {isMoved && (
          <div onClick={handleLeftClick}>
            {sliderArrow && <BiLeftArrow />}
          </div>
        )}
        <SliderContent ref={ref} {...sliderProps}>
          {displayShows.map((show: Show) => (
            <Card
              key={`${filter}${show.id}`}
              show={show}
              showWidth={showWidth}
              arrowToggle={(show: boolean) => {
                setSliderArrow(show);
              }}
            />))}

        </SliderContent>
        <div className="slider-control right" onClick={handleRightClick}>
          {sliderArrow && <BiRightArrow />}
        </div>
      </SliderContainer>
    </RowContainer>
  );
};

export default Slider;

const RowContainer = styled.div`
  position: relative;
  width: 100vw;
  padding-bottom: 1rem;
  overflow-x: hidden;
  div.row-header {
    margin: 0.5rem 4vw 0.5rem;
    @media ${devices.medium} {
      margin: 0.5rem 7vw 0.5rem;
    }
    h2 {
      line-height: 1.3;
      margin: 0;
    }
  }
`;

const SliderContainer = styled.div`
  position: relative;
  padding: 0 4vw;
  white-space: nowrap;
  @media ${devices.medium} {
    padding: 0 7vw;
  }
  &:hover div.slider-control {
    svg {
      opacity: 1;
    }
  }
  div.slider-control {
    position: absolute;
    height: 100%;
    width: calc(4vw - 5px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 12;
    background: hsla(0, 0%, 8%, 0.5);
    border-radius: 4px 0 4px 0;
    opacity: 1;
    cursor: pointer;
    @media ${devices.medium} {
      width: calc(7vw - 4px);
    }
    &:hover svg {
      transform: scale(1.5);
    }
    svg {
      fill: white;
      font-size: 3rem;
      opacity: 0;
    }
  }
  div.slider-control.left {
    left: 0;
  }
  div.slider-control.right {
    top: 0;
    right: 0;
  }
`;

