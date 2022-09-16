import React, { ReactNode } from 'react';

interface ListContainerProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export default function ListContainer({ children, className }: ListContainerProps) {
    return (
        <div className={`m-auto max-w-screen-sm h-[calc(80vh)] overflow-auto px-10 mt-10 ${className}`}>
            {children}
        </div>
    );
}
