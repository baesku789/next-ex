import styled from 'styled-components';

interface TooltipProps {
    display: 'none' | 'flex';
    parentHeight?: number;
    children?: JSX.Element | string;
    width?: number | string;
    fontSize?: number | string;
    pos?: 'top';
}

const StyledTooltip = styled.div<TooltipProps>`
  position: absolute;
  border-radius: 5px;
  background: lightgray;
  display: ${props => props.display};
  padding: 10px;
  width: ${props => props.width || '80vw'};
  font-size: ${props => props.fontSize || '14px'};
  z-index: 999;
  justify-content: center;
  left: 50%;
  transform: translateX(-50%);

  &:after {
    content: "";
    height: 0;
    right: 47.9%;
    position: absolute;
    bottom: ${props => props.pos === 'top' && 0}px;
    width: 0;
  }
`;

const TopTooltip = styled(StyledTooltip)`
  top: -50px;

  &:after {
    border-top: 8px solid lightgray;
    border-left: 7px solid white;
    border-right: 7px solid white;
    left: 50%;
    transform: translateX(-50%);
    bottom: -7px;
  }
`;

const BottomTooltip = styled(StyledTooltip)`
  top: ${props => props.parentHeight + 8}px;

  &:after {
    border-bottom: 8px solid lightgray;
    border-left: 7px solid white;
    border-right: 7px solid white;
    right: 47.9%;
    top: -7px;
    bottom: ${props => props.pos === 'top' && 0}px;
  }
`;

export const Tooltip = (props: TooltipProps) => {
    const { children } = props;

    return (<>
        {
            (props && props.pos === 'top') ?
                <TopTooltip {...props}>{children}</TopTooltip>
                :
                <BottomTooltip {...props}>{children}</BottomTooltip>
        }
    </>);
};
