import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Typewriter from 'typewriter-effect/dist/core';
import { useEffect } from 'react';

const DynamicThreejs = dynamic(() => import('../components/3D/Threejs'), {
    ssr: false
});

function HomePage() {

    useEffect(() => {
        const app = document.querySelector('#app');

        const typewriter = new Typewriter(app, {
            delay: 75
        });


        typewriter
            .typeString('통계청에서 제공하는 API를 기반으로 <br> 데이터를 보여주고 있습니다.')
            .start();
    }, []);

    return (
        <nav>
            <div className={'h-[calc(50vh)]'}>
                <DynamicThreejs />
            </div>
            <div className={'w-full flex justify-center items-center'}>
                <Link href={'/kosis'}>
                    <div className={'flex gap-5'}>
                        <h1>통계 목록 보기</h1>
                        <Image src={'/images/east_black_24dp.svg'} width={24} height={24} />
                    </div>
                </Link>
            </div>
            <div className={'p-20 text-center'} id={'app'}></div>
        </nav>
    );
}

export default HomePage;
