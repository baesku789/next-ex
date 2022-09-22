import { getBarData } from '../../lib/utils';
import CustomBar from './CustomBar';
import { Tooltip } from '../tooltip/Tooltip';
import { useEffect, useRef, useState } from 'react';

interface ChartColumnProps {
    max: number;
    item: string;
    date: string;
    isLast: boolean;
}

export default function ChartColumn({ max, item, date, isLast }: ChartColumnProps) {
    const [hover, setHover] = useState(false);

    const ref = useRef<HTMLDivElement>();

    const clickOutside = (e: Event) => {
        if (!ref.current || !ref.current.contains(e.target as Node)) {
            setHover(false);
        }
    };

    useEffect(() => {
        globalThis.addEventListener('click', clickOutside);

        if (isLast) setHover(true)

        return () => {
            globalThis.removeEventListener('click', clickOutside);
        };
    }, []);

    return (
        <div
            ref={ref}
            className={'relative w-full h-full flex flex-col justify-end items-center'}
            onClick={() => setHover(true)}
        >
            <div className={'w-full h-full pb-30 flex flex-col justify-end items-center'}>
                <CustomBar
                    width={`55`}
                    height={getBarData(max, item).toFixed()}
                    direction={'vertical'}
                >
                    <Tooltip display={hover ? 'flex' : 'none'} width={'60px'} pos={'top'}>{item}</Tooltip>
                </CustomBar>
            </div>
            <div className={'absolute bottom-0 h-30 bottom-0 text-12'}>{date}</div>
        </div>
    );
}
