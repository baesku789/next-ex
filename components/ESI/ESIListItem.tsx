import { generateKey, getBarData, getFormattedDate } from '../../lib/utils';
import React from 'react';
import { ESIListItem as ESIListItemType } from '../../lib/api/api';
import CustomBar from '../chart/CustomBar';
import { useRecoilValue } from 'recoil';
import { ESIMax } from '../../recoil/ESI';

interface ESIListItemProps {
    item: ESIListItemType
}

export default function ESIListItem ({item}:ESIListItemProps) {
    const max = useRecoilValue(ESIMax)

    return (
        <div
            className={'my-10 border-1 border-solid border-black p-10 flex flex-col gap-y-10'}
        >
            <div>{getFormattedDate(item.PRD_DE)}</div>
            <div className={'flex justify-end'}>
                <CustomBar width={(getBarData(max,item.DT)*0.7).toFixed().toString()} height={'20'}/>
            </div>
            <div className={'text-right'}>
                <strong>{item.DT}</strong>
            </div>
        </div>
    );
}
