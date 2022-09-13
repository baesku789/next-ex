import Link from 'next/link';
import dynamic from 'next/dynamic';

const DynamicThreejs = dynamic(() => import('../components/3D/Threejs'), {
	ssr:false
})

function HomePage() {
	return (
		<nav>
			<Link href={'/kosis'}>통계 목록 보기</Link>
			<DynamicThreejs/>
		</nav>
	);
}

export default HomePage;
