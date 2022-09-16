import { getBarData, getFormattedDate } from '../../lib/utils';
import CustomBar from '../chart/CustomBar';
import React from 'react';

interface BarItemProps {
    date: string;
    max: number;
    index: string;
}

export default function BarItem({ date, max, index }: BarItemProps) {
    return (
        <div
            className={'my-10 first:mt-0 last:mb-0 border-1 border-solid border-black p-10 flex flex-col gap-y-10 rounded-5'}
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
