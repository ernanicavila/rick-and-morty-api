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
		>
			<Flex flexDir="column" justifyContent="center">
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
					w="150px"
				>
					Visualizar Perfil
				</Button>
			</Flex>
			<Image
				w={{ base: '50%', md: '150px' }}
				minWidth="75px"
				src={image}
				alt={`foto de ${name}`}
				rounded="md"
			/>
		</Flex>
	);
}

export default CharacterCard;
