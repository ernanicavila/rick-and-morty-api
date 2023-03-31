import React from 'react';
import { Text, Image, Flex, Button, Checkbox } from '@chakra-ui/react';
import { IgetAll } from '@/interfaces';
function CharacterCard({
	name,
	status,
	image,
	onClick,
	favClick,
	isChecked,
}: IgetAll) {
	return (
		<Flex
			p="8px"
			m="8px 0px"
			justifyContent="space-between"
			border="1px solid black"
			rounded="md"
			w="350px"
			backgroundColor="white"
		>
			<Flex
				// border="1px solid black"
				w="60%"
				mx="auto"
				flexDir="column"
				justifyContent="center"
				p='8px'
			>
				<Text>Nome: {name}</Text>
				<Text>Status: {status}</Text>
				<Checkbox type="checkbox" onChange={favClick} isChecked={isChecked}>
					Favoritar
				</Checkbox>
				<Button
					mt="8px"
					as="button"
					name="Visualizar Perfil"
					size="sm"
					colorScheme="green"
					onClick={onClick}
					w={{ base: '125px', md: '150px' }}
				>
					Visualizar Perfill
				</Button>
			</Flex>
			<Image
				w={{ base: '40%', md: '150px' }}
				minWidth="75px"
				src={image}
				alt={`foto de ${name}`}
				rounded="md"
			/>
		</Flex>
	);
}

export default CharacterCard;
