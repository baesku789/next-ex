import React from 'react';

interface ListHeaderProps<T> {
    data: T
}

export default function ListHeader<T extends any[]>({ data }: ListHeaderProps<T>) {
    return (
        <div className={'sticky top-0 bg-white z-10'}>
            <h1>통계목록</h1>
            <div>총 개수 : {data.length}</div>
        </div>
    )
}
