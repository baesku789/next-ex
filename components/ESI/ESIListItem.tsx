import { generateKey } from '../../lib/utils';
import React from 'react';
import { ESIListItem as ESIListItemType } from '../../lib/api/api';

interface ESIListItemProps {
    item: ESIListItemType
}

export default function ESIListItem ({item}:ESIListItemProps) {
    return (
        <div
            className={'my-10 border-1 border-solid border-black p-10 flex flex-col gap-y-10'}
        >
            <div>{item.PRD_DE}</div>
            <div className={'text-right'}>
                <strong>{item.DT}</strong>
            </div>
        </div>
    );
}
