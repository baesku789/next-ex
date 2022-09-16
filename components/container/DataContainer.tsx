import React, { ReactNode } from 'react';

interface DataContainerProps<T> {
    isError: boolean;
    data: T;
    isRefetching: boolean;
    children: ReactNode;
}

export default function DataContainer<T extends Array<any>>({
                                                                isError,
                                                                data,
                                                                isRefetching,
                                                                children
                                                            }: DataContainerProps<T>) {
    if (isError || !data || data.hasOwnProperty('err')) {
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
            {children}
        </div>
    );
}
