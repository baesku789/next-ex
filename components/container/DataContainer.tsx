import React, { memo } from 'react';
import BarItem from '../items/BarItem';
import { generateKey } from '../../lib/utils';
import { useRecoilValue } from 'recoil';
import { ESIMax } from '../../recoil/ESI';

interface DataContainerProps<T> {
    isError: boolean;
    data: T;
    isRefetching: boolean;
}

function DataContainer<T extends Array<any>>({
                                                 isError,
                                                 data,
                                                 isRefetching
                                             }: DataContainerProps<T>) {
    const max = useRecoilValue(ESIMax);

    if (isError || !data) {
        return <div>조회에 실패했습니다.</div>;
    }

    if (data.length === 0) {
        return <div>데이터가 없습니다.</div>;
    }

    if (isRefetching) {
        return <div>조회중...</div>;
    }


    return (
        <div className={'flex flex-col h-[calc(100vh-300px)] overflow-auto w-full box-border px-10'}>
            {data.map((item, index) =>
                <BarItem key={generateKey(index)} date={item.PRD_DE} max={max} index={item.DT} />
            )}
        </div>
    );
}

export default memo(DataContainer);