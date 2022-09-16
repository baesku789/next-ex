import { getRouteHref } from '../../lib/utils';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { recoilRoutes } from '../../recoil/routes';
import { useRouter } from 'next/router';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface RouterItemProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    name: string;
    sort?: string;
}

export default function RouterItem({ name, sort, className }: RouterItemProps) {
    const routes = useRecoilValue(recoilRoutes);
    const router = useRouter();

    return (
        <div
            className={twMerge(`border-1 border-black pl-10 flex justify-between rounded-5 ${className}`)}
            onClick={() => router.push(getRouteHref(routes, name))}
        >
            <div>
                <div>
                    <strong>{name}</strong>
                </div>
                <div>{sort}</div>
            </div>
            {
                getRouteHref(routes, name) &&
                <div className={'relative w-24 h-24 my-auto'}>
                    <Image src={'/images/arrow_forward_black.svg'} layout={'fill'} alt={'arrow'} />
                </div>
            }
        </div>
    );
}
