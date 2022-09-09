import Link from 'next/link';

function HomePage() {
	return (
		<nav>
			<h1>welcome to next.js!</h1>
			<Link href={'/kosis'}>통계 목록 보기</Link>
		</nav>
	);
}

export default HomePage;
