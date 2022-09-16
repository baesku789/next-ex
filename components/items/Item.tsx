import { ReactNode } from 'react';

interface ItemProps {
    children: ReactNode;
}

export default function Item({ children }: ItemProps) {
    return (
        <div className={'border-black border-1 border-solid rounded-5 p-10'}>
            {children}
        </div>
    );
}
