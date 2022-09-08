import styled, { keyframes } from 'styled-components';

interface BarProps {
    width: string;
    height: string;
}

const IncreaseWidth = keyframes`
  from {
    width: 0
  }
  to {
    width: ${props => props.width}
  }
`

const Bar = styled.div<BarProps>`
  width: ${props => props.width}%;
  height: ${props => props.height}px;
  background: linear-gradient(to right, #434343 0%, black 100%);
  border-radius: 5px;
  animation: 1s ${IncreaseWidth};
`;

export default function CustomBar(props: BarProps) {
    return (
        <Bar {...props} />
    );
}
