import { getBarData } from '../../lib/utils';
import CustomBar from './CustomBar';
import { Tooltip } from '../tooltip/Tooltip';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface ChartColumnProps {
    max: number;
    item: string;
    date: string;
    isLast: boolean;
    index: number;
}

const BottomText = styled.div<{ bottom }>`
  position: absolute;
  bottom: ${props => props.bottom}px;
  height: 30px;
  font-size: 12px;
`;

export default function ChartColumn({ max, item, date, isLast, index }: ChartColumnProps) {
    const [hover, setHover] = useState(false);

    const ref = useRef<HTMLDivElement>();

    const clickOutside = (e: Event) => {
        if (!ref.current || !ref.current.contains(e.target as Node)) {
            setHover(false);
        }
    };

    const bottom = index % 2 !== 0 ? 0 : -12;

    useEffect(() => {
        globalThis.addEventListener('click', clickOutside);

        if (isLast) setHover(true);

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
            <BottomText bottom={bottom}>{date}</BottomText>
        </div>
    );
}
