import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const DynamicThreejs = dynamic(() => import('../components/3D/Threejs'), {
    ssr: false
});

function HomePage() {
    return (
        <nav>
            <DynamicThreejs />
            <div className={'w-full flex justify-center items-center'}>
                <Link href={'/kosis'}>
                    <div className={'flex gap-5'}>
                        <h1>통계 목록 보기</h1>
                        <Image src={'/images/east_black_24dp.svg'} width={24} height={24} />
                    </div>
                </Link>
            </div>
        </nav>
    );
}

export default HomePage;
