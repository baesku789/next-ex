import styled from 'styled-components';

interface TooltipProps {
    display: 'none' | 'flex';
    parentHeight: number;
    children?: JSX.Element;
}

const StyledTooltip = styled.div<TooltipProps>`
  position: absolute;
  border-radius: 5px;
  background: lightgray;
  display: ${props => props.display};
  top: ${props => props.parentHeight + 8}px;
  padding: 10px;
  width: 80vw;

  &:after {
    border-bottom: 8px solid lightgray;
    border-left: 7px solid white;
    border-right: 7px solid white;
    content: "";
    height: 0;
    right: 48%;
    position: absolute;
    top: -7px;
    width: 0;
  }
`;

export const Tooltip = (props: TooltipProps) => {
    const { children } = props;

    return <StyledTooltip {...props}>{children}</StyledTooltip>;
};
