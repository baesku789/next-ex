import CustomBar from './CustomBar';
import { generateKey, getBarData } from '../../lib/utils';
import styled from 'styled-components';

interface ChartProps {
    data: any[];
}

const Container = styled.div<{ max: number }>`
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: ${props => props.max + 20}px;
`;

export default function Chart({ data }: ChartProps) {

    const max = Math.max(...data.map(item => item.DT));

    return (
        <Container max={max}>
            {
                data.map((item, index) =>
                    <div key={generateKey(index)} className={'w-full h-full flex flex-col justify-end items-center'}>
                        <CustomBar
                            width={`70`}
                            height={getBarData(max, item.DT).toFixed()}
                            direction={'vertical'}
                        />
                    </div>)
            }
        </Container>
    );
}
