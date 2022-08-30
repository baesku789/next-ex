import '../style/styles.css';
import {
	Hydrate,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { useState } from 'react';

// This default export is required in a new `pages/_app.jsx` file.
export default function MyApp({ Component, pageProps }) {
	// Use the layout defined at the page level, if available
	const getLayout = Component.getLayout || ((page) => page);

	const [queryClient] = useState(() => new QueryClient());

	return getLayout(
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<Component {...pageProps} />
			</Hydrate>
		</QueryClientProvider>
	);
}
