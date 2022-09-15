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
  top: ${props => props.parentHeight + 5}px;
  padding: 10px;
  width: 80vw;
`;

export const Tooltip = (props: TooltipProps) => {
    const { children } = props;

    return <StyledTooltip {...props}>{children}</StyledTooltip>;
};
