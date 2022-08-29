import Layout from "../components/layout";
import NestedLayout from "../components/nested-layout";
import {useRouter} from "next/router";
import {useEffect} from "react";

function HomePage() {
	const router = useRouter()

	useEffect(() => {
		// Always do navigations after the first render
		router.push('/?counter=10', undefined, {shallow:true})
	}, []);

	return <div>Welcome to Next.js!</div>
}

HomePage.getLayout = function getLayout(page){
	return (
		<Layout>
			<NestedLayout>{page}</NestedLayout>
		</Layout>
	)
}

export default HomePage
