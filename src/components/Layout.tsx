import React from 'react';
import { Box, Link, Flex } from '@chakra-ui/react';

function Layout({ children }: React.PropsWithChildren) {
	return (
		<Box backgroundColor="#EBF8FF" h="100%">
			<Box boxShadow="lg" p="8px" borderBottom="1px solid black">
				<Flex justifyContent="space-between" w={{ base: '200px', md: '150px' }}>
					<Link href="/">Home</Link>
					<Link href="/favorites">Favoritos</Link>
				</Flex>
			</Box>
			<Flex flexDir="column" mx="auto">
				{children}
			</Flex>
		</Box>
	);
}

export default Layout;
