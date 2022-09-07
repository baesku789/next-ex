import styled from 'styled-components';

interface BarProps {
    width:string
    height:string
}

export default function CustomBar ({width, height}:BarProps) {
    const Bar = styled.div `
        width: ${width}%;
        height: ${height}px;
        background: black;
    `

    return (
        <Bar/>
    )
}
