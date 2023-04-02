import React from 'react';
import {
	Box,
	Link,
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	IconButton,
	Image,
	Drawer,
	DrawerFooter,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
} from '@chakra-ui/react';
import { FiMenu, FiHome, FiStar } from 'react-icons/fi';
import { useAppSelector } from '@/Redux/hooks';
import { selectUser } from '@/Redux/slice';
import md5 from 'crypto-js/md5';

function Layout({ children }: React.PropsWithChildren) {
	const { isOpen, onOpen, onClose } = useDisclosure();

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
							onClick={onOpen}
						/>
						<Drawer isOpen={isOpen} placement="left" onClose={onClose}>
							<DrawerOverlay />
							<DrawerContent>
								<DrawerCloseButton />
								<Box p="32px 8px">
									<Flex mb="30px" alignItems="center">
										<Image
											mr="16px"
											rounded="100%"
											w="50px"
											h="50px"
											src={`https://www.gravatar.com/avatar/${md5(
												String(email),
											)}`}
											alt="user avatar"
										/>
										{email}
									</Flex>
									<Box mt="40px">
										<MenuItem as="a" icon={<FiHome size="15px" />} href="/home">
											Home
										</MenuItem>
										<MenuItem
											as="a"
											icon={<FiStar size="15px" />}
											href="/favorites"
										>
											Favoritos
										</MenuItem>
									</Box>
								</Box>
								<DrawerFooter position="fixed" bottom="0">
									<Box>
										<Image
											src="images/rick.jpg"
											w="150px"
											alt="rick and morty logo"
										/>
									</Box>
								</DrawerFooter>
							</DrawerContent>
						</Drawer>
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
