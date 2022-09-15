import Link from 'next/link';
import Image from 'next/image';

interface KosisItemProps {
    href: string;
    title: string;
}

export default function KosisItem({ href, title }: KosisItemProps) {
    return (
        <li className={'border-black border-1 border-solid rounded-5 p-10'}>
            <Link href={href}>
                <div className={'flex gap-8 justify-between'}>
                    <h1>{title}</h1>
                    <Image src={'/images/east_black_24dp.svg'} width={24} height={24} />
                </div>
            </Link>
        </li>
    );
}
