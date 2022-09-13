import styled, { keyframes, SimpleInterpolation } from 'styled-components';

interface BarProps {
    width: string;
    height: string;
}

const getPropsWidth = (props) => {
    return props.width as SimpleInterpolation
}

const IncreaseWidth = (props) => keyframes`
  from {
    width: 0
  }
  to {
    width: ${props.width}
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
