import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { recoilRoutes } from '../recoil/routes';
import Head from 'next/head';

const Header = () => {
    const router = useRouter();
    const routes = useRecoilValue(recoilRoutes);

    const currentRoute = routes.filter(route => route.href === router.pathname)[0];

    return (
        <>
            <Head>
                <title>{currentRoute.title}</title>
                <meta property={'og:title'} content={currentRoute.title} />
                <meta property={'og:description'} content={'통계청에서 제공하는 경제 심리 지수입니다.'} />
            </Head>
            <div className={'pl-5 border-solid border-gray-50 border-b-2 h-40 flex justify-start items-center'}>
                <Image alt={'home'} onClick={() => router.push('/')} src={'/images/home_black_24dp.svg'} width={24}
                       height={24} />
                <h1 className={'pl-10'}>{currentRoute.title || ''}</h1>
            </div>
        </>
    );
};

export default Header;