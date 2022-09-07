import { ESIListItem as ESIListItemType } from '../../lib/api/api';
import React from 'react';
import ESIListItem from './ESIListItem';
import { generateKey } from '../../lib/utils';

interface ESIListProps {
    isError:boolean
    data:ESIListItemType[]
    isRefetching?:boolean
}

const ESIList = ({isError, data, isRefetching}:ESIListProps) => {
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
        <div className={'flex'}>
            {data.map((item, index) =>
                <ESIListItem key={generateKey(index)} item={item} />
            )}
        </div>
    )
}

export default ESIList