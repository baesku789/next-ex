import React, { ReactNode } from 'react';

interface ListContainerProps {
    children: ReactNode;
}

export default function ListContainer({ children }: ListContainerProps) {
    return (
        <div className={'m-auto max-w-screen-sm h-[calc(80vh)] overflow-auto px-10 mt-10'}>
            {children}
        </div>
    );
}
