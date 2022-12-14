import React from 'react';

interface ListHeaderProps {
    length: number;
}

export default function ListHeader({ length }: ListHeaderProps) {
    return (
        <div className={'sticky top-0 bg-white z-10'}>
            <h1>통계목록</h1>
            <div>총 개수 : {length}</div>
        </div>
    );
}
