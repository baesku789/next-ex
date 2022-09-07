import { generateKey, getBarData, getFormattedDate } from '../../lib/utils';
import React from 'react';
import { ESIListItem as ESIListItemType } from '../../lib/api/api';
import CustomBar from '../chart/CustomBar';

interface ESIListItemProps {
    item: ESIListItemType
    max:number
}

export default function ESIListItem ({item, max}:ESIListItemProps) {
    return (
        <div
            className={'my-10 border-1 border-solid border-black p-10 flex flex-col gap-y-10'}
        >
            <div>{getFormattedDate(item.PRD_DE)}</div>
            <div className={'flex justify-end'}>
                <CustomBar width={(getBarData(max,item.DT)/2).toString()} height={'20'}/>
            </div>
            <div className={'text-right'}>
                <strong>{item.DT}</strong>
            </div>
        </div>
    );
}
