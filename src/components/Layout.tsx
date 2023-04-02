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
	Image,
} from '@chakra-ui/react';
import { FiMenu, FiHome, FiStar } from 'react-icons/fi';
import { useAppSelector } from '@/Redux/hooks';
import { selectUser } from '@/Redux/slice';
import md5 from 'crypto-js/md5';

function Layout({ children }: React.PropsWithChildren) {
	const {
		user: { email },
	} = useAppSelector(selectUser);
	return (
		<Box backgroundColor="#EBF8FF" minH="100vh" h="100%">
			<Box boxShadow="lg" p="8px" borderBottom="1px solid black">
				<Flex
					w="100%"
					p={{ base: 'none', md: '8px' }}
					justifyContent="space-between"
					alignItems="center"
				>
					<Flex
						display={{ base: 'none', md: 'flex' }}
						justifyContent="space-between"
						w={{ base: '200px', md: '150px' }}
					>
						<Link href="/home">Home</Link>
						<Link href="/favorites">Favoritos</Link>
					</Flex>
					<Flex alignItems="center" display={{ base: 'none', md: 'flex' }}>
						{email}
						<Image
							ml="16px"
							rounded="100%"
							w="50px"
							h="50px"
							src={`https://www.gravatar.com/avatar/${md5(String(email))}`}
							alt="user avatar"
						/>
					</Flex>
				</Flex>
				<Flex alignItems="center" display={{ base: 'flex', md: 'none' }}>
					<Menu>
						<MenuButton
							bgColor="white"
							as={IconButton}
							aria-label="Options"
							icon={<FiMenu />}
							variant="outline"
						/>
						<MenuList>
							<MenuItem as="a" icon={<FiHome />} href="/home">
								Home
							</MenuItem>
							<MenuItem as="a" icon={<FiStar />} href="/favorites">
								Favoritos
							</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</Box>
			<Flex flexDir="column" mx="auto">
				{children}
			</Flex>
		</Box>
	);
}

export default Layout;
