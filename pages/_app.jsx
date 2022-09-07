import '../style/styles.css';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ErrorBoundary from '../components/Errorboundary';

// This default export is required in a new `pages/_app.jsx` file.
export default function MyApp({ Component, pageProps }) {
	// Use the layout defined at the page level, if available
	const getLayout = Component.getLayout || ((page) => page);

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

	return getLayout(
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<ErrorBoundary FallbackComponent={<div>Error</div>}>
					<Component {...pageProps} />
				</ErrorBoundary>
				<ReactQueryDevtools initialIsOpen={false}/>
			</Hydrate>
		</QueryClientProvider>
	);
}
