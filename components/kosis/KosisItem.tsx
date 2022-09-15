import Link from 'next/link';
import Image from 'next/image';

interface KosisItemProps {
    href: string;
    title: string;
}

export default function KosisItem({ href, title }: KosisItemProps) {
    return (
        <li>
            <Link href={href}>
                <div className={'flex gap-8'}>
                    <h1>{title}</h1>
                    <Image src={'/images/east_black_24dp.svg'} width={24} height={24} />
                </div>
            </Link>
        </li>
    );
}
