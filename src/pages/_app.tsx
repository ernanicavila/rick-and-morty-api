import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { store } from '../Redux/store';

const breakpoints = {
	sm: '320px',
	md: '768px',
	lg: '960px',
	xl: '1200px',
	'2xl': '1920px',
};

const theme = extendTheme({ breakpoints });

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={new QueryClient()}>
			<Provider store={store}>
				<ChakraProvider theme={theme}>
					<title>Green Acesso Test</title>
					<Component {...pageProps} />
				</ChakraProvider>
			</Provider>
		</QueryClientProvider>
	);
}
