import { getBarData } from '../../lib/utils';
import CustomBar from './CustomBar';
import { Tooltip } from '../tooltip/Tooltip';
import { useState } from 'react';

interface ChartColumnProps {
    max: number;
    item: string;
    date: string;
    index?: number;
}

export default function ChartColumn({ max, item, date, index }: ChartColumnProps) {
    const [hover, setHover] = useState(false);

    return (
        <div
            className={'relative w-full h-full flex flex-col justify-end items-center'}
            onClick={() => setHover(true)}
        >
            <Tooltip display={hover ? 'flex' : 'none'} width={'60px'} pos={'top'}>{item}</Tooltip>
            <div className={'w-full h-full pb-30 flex flex-col justify-end items-center'}>
                <CustomBar
                    width={`55`}
                    height={getBarData(max, item).toFixed()}
                    direction={'vertical'}
                />
            </div>
            <div className={'absolute bottom-0 h-30 bottom-0 text-12'}>{date}</div>
        </div>
    );
}
