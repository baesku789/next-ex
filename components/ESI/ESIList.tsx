import { ESIListItem } from '../../lib/api/api';
import { generateKey } from '../../lib/utils';
import React from 'react';

interface ESIListProps {
    isError:boolean
    data:ESIListItem[]
    isRefetching?:boolean
}

const ESIList = ({isError, data, isRefetching}:ESIListProps) => {
    if (isError || !data) {
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
            {data.map((el, index) => {
                return (
                    <div
                        key={generateKey(index)}
                        className={'mx-10 first:ml-0 border-1 border-solid border-black p-10 flex flex-col gap-y-10'}
                    >
                        <div>{el.PRD_DE}</div>
                        <div className={'text-right'}>
                            <strong>{el.DT}</strong>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default ESIList