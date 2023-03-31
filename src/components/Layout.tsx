import React from 'react';
import { Box, Link, Flex } from '@chakra-ui/react';

function Layout({ children }: React.PropsWithChildren) {
	return (
		<>
			<Box p="8px" borderBottom="1px solid black">
				<Flex justifyContent="space-between" w="150px">
					<Link href="/">Home</Link>
					<Link href="/favorites">Favoritos</Link>
				</Flex>
			</Box>
			<Flex
				border="1px solid purple"
				flexDir="column"
				mx="auto"
			>
				{children}
			</Flex>
		</>
	);
}

export default Layout;
