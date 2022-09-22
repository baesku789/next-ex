import React, { memo } from 'react';
import BarItem from '../items/BarItem';
import { generateKey } from '../../lib/utils';
import { useRecoilValue } from 'recoil';
import { ESIMax } from '../../recoil/ESI';
import RouterItem from '../items/RouterItem';
import Chart from '../chart/Chart';

interface DataContainerProps<T> {
    isError: boolean;
    data: T | undefined;
    type: 'bar' | 'router' | 'chart';
    isRefetching?: boolean;
}

function DataContainer<T extends Array<any>>({
                                                 isError,
                                                 data,
                                                 isRefetching,
                                                 type
                                             }: DataContainerProps<T>) {
    const max = useRecoilValue(ESIMax);

    if (isError || !data) {
        return <div>조회에 실패했습니다.</div>;
    }

    if (data.length === 0) {
        return <div>데이터가 없습니다.</div>;
    }

    if (isRefetching) {
        return <div>재조회중...</div>;
    }

    return (
        <div
            className={`w-full flex flex-col ${type === 'chart' && 'justify-center overflow-hidden'} h-[calc(100vh-300px)] overflow-auto w-full box-border gap-10`}>
            {data.map((item, index) => {
                    if (type === 'bar') {
                        return (
                            <BarItem key={generateKey(index)} date={item.PRD_DE} max={max} current={item.DT} />
                        );
                    } else if (type === 'router') {
                        return (
                            <RouterItem key={item.LIST_NM} name={item.LIST_NM} sort={item.VW_NM} />
                        );
                    }
                }
            )}
            {
                type === 'chart' && <Chart data={data} key={`${generateKey()}`} />
            }
        </div>
    );
}

export default memo(DataContainer);