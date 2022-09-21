import styled from 'styled-components';
import ChartColumn from './ChartColumn';
import { generateKey, getFormattedDate } from '../../lib/utils';

interface ChartProps {
    data: any[];
}

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 50%;
  box-sizing: border-box;
  width: calc(100% - 20px);
  margin: 0 auto;
`;

export default function Chart({ data }: ChartProps) {

    const max = Math.max(...data.map(item => item.DT));

    return (
        <Container>
            {
                data.map((item, index) =>
                    <ChartColumn key={generateKey(index)}
                                 date={getFormattedDate(item.PRD_DE, 'dot')} max={max} item={item.DT} />)
            }
        </Container>
    );
}
