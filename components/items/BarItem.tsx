import { getBarData, getFormattedDate } from '../../lib/utils';
import CustomBar from '../chart/CustomBar';
import React, { memo } from 'react';

interface BarItemProps {
    date: string;
    max: number;
    index: string;
}

function BarItem({ date, max, index }: BarItemProps) {
    return (
        <div
            className={'border-1 border-solid border-black p-10 flex flex-col gap-y-10 rounded-5'}
        >
            <div>{getFormattedDate(date)}</div>
            <div className={'flex justify-end'}>
                <CustomBar width={(getBarData(max, index) * 0.7).toFixed().toString()} height={'20'} />
            </div>
            <div className={'text-right'}>
                <strong>{index}</strong>
            </div>
        </div>
    );
}

export default memo(BarItem);