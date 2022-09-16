import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { recoilRoutes } from '../recoil/routes';
import Head from 'next/head';
import { defaultRoute } from '../const/route/defaultRoute';
import ImageTooltip from './tooltip/ImageTooltip';
import { ESIDescription } from './tooltip/description';

const Header = () => {
    const router = useRouter();
    const routes = useRecoilValue(recoilRoutes);

    const currentRoute = routes.filter(route => route.href === router.pathname)[0] || defaultRoute;

    return (
        <>
            <Head>
                <title>{currentRoute.title}</title>
                <meta property={'og:title'} content={currentRoute.title} />
                <meta property={'og:description'} content={'통계청에서 제공하는 경제 심리 지수입니다.'} />
            </Head>
            <div className={'pl-5 border-solid border-gray-50 border-b-2 h-40 flex justify-start items-center gap-6'}>
                <Image alt={'home'} onClick={() => router.push('/')} src={'/images/home_black_24dp.svg'} width={24}
                       height={24} />
                <h1 className={'pl-10'}>{currentRoute.title || ''}</h1>
                {
                    currentRoute.tooltipChildren && currentRoute.tooltipChildren === 'ESIDescription' &&
                    <ImageTooltip alt={'물음표'} height={24} width={24} imgUrl={'/images/question_mark_black_24dp.svg'}
                                  TooltipChildren={() => <ESIDescription />} />
                }
            </div>
        </>
    );
};

export default Header;
