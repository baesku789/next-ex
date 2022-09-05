import Layout from '../components/layout';
import NestedLayout from '../components/nested-layout';
import Link from 'next/link';

function HomePage() {
	return (
		<nav>
			<Link href={'/about'}>About</Link>
		</nav>
	);
}

HomePage.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default HomePage;
