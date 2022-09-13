import '../style/styles.css';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ErrorBoundary from '../components/Errorboundary';
import Layout from '../components/layout';
import { RecoilRoot } from 'recoil';
import DebugObserver from '../recoil/DebugObserver';
import Head from 'next/head'

// This default export is required in a new `pages/_app.jsx` file.
export default function MyApp({ Component, pageProps }) {

	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						retry: false,
						retryOnMount: false,
						refetchOnMount: false,
						refetchOnWindowFocus: false,
					},
				},
			})
	);

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<ErrorBoundary FallbackComponent={<div>Error</div>}>
					<RecoilRoot>
						<DebugObserver/>
						<Head>
							<meta name={'viewport'} content={'user-scalable=no'} />
						</Head>
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</RecoilRoot>
				</ErrorBoundary>
				<ReactQueryDevtools initialIsOpen={false}/>
			</Hydrate>
		</QueryClientProvider>
	);
}
