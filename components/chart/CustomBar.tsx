import styled from 'styled-components';

interface BarProps {
    width:string
    height:string
}

const Bar = styled.div<BarProps> `
        width: ${props => props.width}%;
        height: ${props => props.height}px;
        background: black;
`

export default function CustomBar (props:BarProps) {
    return (
        <Bar {...props}/>
    )
}
