import Link from 'next/link';
import Image from 'next/image';
import Item from './Item';

interface LinkItemProps {
    href: string;
    title: string;
}

export default function LinkItem({ href, title }: LinkItemProps) {
    return (
        <Item>
            <Link href={href}>
                <div className={'flex gap-8 justify-between'}>
                    <h1>{title}</h1>
                    <Image alt={'화살표'} src={'/images/east_black_24dp.svg'} width={24} height={24} />
                </div>
            </Link>
        </Item>
    );
}
