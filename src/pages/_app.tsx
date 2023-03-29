import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';

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
			<ChakraProvider
			 theme={theme}
			>
				<title>Green Acesso Test</title>
				<Component {...pageProps} />
			</ChakraProvider>
		</QueryClientProvider>
	);
}
