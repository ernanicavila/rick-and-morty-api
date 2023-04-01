import React from 'react';
import {
	Box,
	Link,
	Flex,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	IconButton,
} from '@chakra-ui/react';
import { FiMenu, FiHome } from 'react-icons/fi';
function Layout({ children }: React.PropsWithChildren) {
	return (
		<Box backgroundColor="#EBF8FF" minH="100vh" h="100%">
			<Box boxShadow="lg" p="8px" borderBottom="1px solid black">
				<Flex
					display={{ base: 'none', md: 'flex' }}
					justifyContent="space-between"
					w={{ base: '200px', md: '150px' }}
				>
					<Link href="/home">Home</Link>
					<Link href="/favorites">Favoritos</Link>
				</Flex>
				<Box display={{ base: 'flex', md: 'none' }}>
					<Menu>
						<MenuButton
							bgColor="white"
							as={IconButton}
							aria-label="Options"
							icon={<FiMenu />}
							variant="outline"
						/>
						<MenuList>
							<MenuItem as="a" icon={<FiHome />} href="/">
								Home
							</MenuItem>
							<MenuItem as="a" icon={<FiHome />} href="/favorites">
								Favoritos
							</MenuItem>
						</MenuList>
					</Menu>
				</Box>
			</Box>
			<Flex flexDir="column" mx="auto">
				{children}
			</Flex>
		</Box>
	);
}

export default Layout;
