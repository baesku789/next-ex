import { getBarData, getFormattedDate } from '../../lib/utils';
import CustomBar from '../chart/CustomBar';
import React, { memo, ReactNode } from 'react';

interface BarItemProps {
    date: string;
    max: number;
    current: string;
    children: ReactNode;
}

function BarItem({ date, max, current }: BarItemProps) {
    return (
        <div
            className={'w-full border-1 border-solid border-black p-10 flex flex-col gap-y-10 rounded-5'}
        >
            <div>{getFormattedDate(date)}</div>
            <div className={'w-full flex justify-end'}>
                <CustomBar width={(getBarData(max, current) * 0.7).toFixed().toString()} height={'20'} />
            </div>
            <div className={'text-right'}>
                <strong>{current}</strong>
            </div>
        </div>
    );
}

export default memo(BarItem);