import styled, { keyframes } from 'styled-components';
import { ReactNode } from 'react';

interface BarProps {
    width: string;
    height: string;
    direction?: 'vertical';
    children?: ReactNode;
}

const IncreaseWidth = (props) => keyframes`
  from {
    width: 0
  }
  to {
    width: ${props.width}
  }
`;

const IncreaseHeight = (props) => keyframes`
  from {
    height: 0
  }
  to {
    height: ${props.height}
  }
`;

const Bar = styled.div<BarProps>`
  position: relative;
  width: ${props => props.width}%;
  // direction === vertical 일 경우 스크롤 처리가 되기 때문에 px이 더 적합
  height: ${props => props.height}${props => props.direction ? '%' : 'px'};
  background: linear-gradient(to right, #434343 0%, black 100%);
  border-radius: 5px;
  animation: 1s ${props => !props.direction ? IncreaseWidth : IncreaseHeight};

  &:hover {
    animation-play-state: paused;
  }
`;

export default function CustomBar(props: BarProps) {
    return (
        <Bar {...props} ></Bar>
    );
}
