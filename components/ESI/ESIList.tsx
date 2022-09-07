import { ESIListItem as ESIListItemType } from '../../lib/api/api';
import React from 'react';
import ESIListItem from './ESIListItem';
import { generateKey } from '../../lib/utils';

interface ESIListProps {
    isError:boolean
    data:ESIListItemType[]
    isRefetching?:boolean
    max:number
}

const ESIList = ({isError, data, isRefetching, max}:ESIListProps) => {
    if (isError || !data || data.hasOwnProperty('err')) {
        return <div>조회에 실패했습니다.</div>;
    }

    if (data.length ===0) {
        return <div>데이터가 없습니다.</div>;
    }

    if(isRefetching){
        return <div>조회중...</div>
    }

    return(
        <div className={'flex flex-col h-1/2 overflow-auto w-full box-border px-10'}>
            {data.map((item, index) =>
                <ESIListItem key={generateKey(index)} max={max} item={item} />
            )}
        </div>
    )
}

export default ESIList