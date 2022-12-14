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
  height: 60%;
  box-sizing: border-box;
  width: calc(100% - 20px);
  margin: 0 auto;
  border: 1px solid lightgray;
  border-top-color: transparent;
  border-right-color: transparent;
  padding-left: 10px;
  padding-top: 20px;
`;

export default function Chart({ data }: ChartProps) {

    const max = Math.max(...data.map(item => item.DT));

    return (
        <Container>
            {
                data.map((item, index) => {
                    const isLast = index === data.length - 1;
                    return (<ChartColumn key={generateKey(index)}
                                         date={getFormattedDate(item.PRD_DE, 'dot')} max={max} item={item.DT}
                                         isLast={isLast} index={index} />);
                })
            }
        </Container>
    );
}
